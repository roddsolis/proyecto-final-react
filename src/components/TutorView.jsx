import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/AppContext';
import io from 'socket.io-client';
import ContadorUsuarios from "./ContadorUsuarios";
import CircleSwitch from "./CircleSwitch";
import CustomSwitch from "./CustomSwitch";

const TutorView = ({ userName }) => {
  const { store } = useContext(Context);
  const tutorId = store.usuarioAutenticado ? store.usuarioAutenticado.id : null;
  const [estadoTutor, setEstadoTutor] = useState({
    estado: false,
    solicitud_entrante: false,
    tutor_en_sala: false,
  });
  const [solicitudTutor, setSolicitudTutor] = useState({
    estado: null,
    confirmacion_tutor: null,
    alumno_nombre: null,
  });
  const [socket, setSocket] = useState(null);

  const navigate = useNavigate();

  const obtenerEstadoTutor = async () => {
    console.log('Llamando a obtenerEstadoTutor');
    try {
      const response = await fetch(`http://127.0.0.1:8080/estado/tutor/${tutorId}`);
      const data = await response.json();

      if (response.ok) {
        const { estado, solicitud_entrante, tutor_en_sala } = data.estado_tutor;

        // Utiliza el estado previo para asegurarte de que esté actualizado
        setEstadoTutor(prevState => ({
          estado: estado,
          solicitud_entrante: solicitud_entrante,
          tutor_en_sala: tutor_en_sala,
        }));
        console.log('Estado actual del tutor:', data.estado_tutor);
      } else {
        console.error('Error al obtener el estado actual del tutor:', data.error);
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
    }
  };

  const handleSwitchChange = async () => {
    handleChangeEstado();
  };

  const handleChangeEstado = async () => {
    const endpoint = 'tutor';
    const url = `http://127.0.0.1:8080/cambiar_estado/${endpoint}`;

    try {
      const cambiarEstadoResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [`${endpoint}_id`]: tutorId }),
      });

      if (cambiarEstadoResponse.ok) {
        const cambiarEstadoData = await cambiarEstadoResponse.json();

        if (cambiarEstadoData.estado) {
          console.log(`El estado del ${endpoint} se estableció en true.`);

          // Llamada directa a verificar_y_emparejar solo si el estado cambió a true
          const url = `http://127.0.0.1:8080/verificar_y_emparejar`;
          const verificarResponse = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ usuario_id: tutorId, tipo_usuario: 'tutor' }),
          });

          if (verificarResponse.ok) {
            const verificarData = await verificarResponse.json();
            console.log('Respuesta completa de verificar y emparejar:', verificarData);
            if (verificarData.message) {
              console.log('Respuesta de verificar y emparejar:', verificarData.message);
            }
          } else {
            console.error('Error al verificar y emparejar:', verificarResponse.statusText);
          }
        } else {
          console.log(`El estado del ${endpoint} se estableció en false.`);
          obtenerEstadoTutor();
          setSolicitudTutor({
            estado: null,
            confirmacion_tutor: null,
            tutor_nombre: null,
          });
        }
      } else {
        throw new Error(`Error al cambiar el estado del ${endpoint}: ${cambiarEstadoResponse.statusText}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleAceptarSolicitud = async (tutorId) => {
    const url = `http://127.0.0.1:8080/procesar_solicitud_sala/${tutorId}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ aceptar: true }),
      });

      if (response.ok) {
        setSolicitudTutor((prevState) => ({
          ...prevState,
          confirmacion_tutor: true,
        }));
      } else {
        console.error('Error al aceptar la solicitud');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  const handleRechazarSolicitud = async (tutorId) => {
    const url = `http://127.0.0.1:8080/procesar_solicitud_sala/${tutorId}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ aceptar: false }),
      });

      if (response.ok) {
        setSolicitudTutor((prevState) => ({
          ...prevState,
          confirmacion_tutor: false,
        }));
      } else {
        console.error('Error al rechazar la solicitud');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  useEffect(() => {
    if (tutorId !== null) {
      obtenerEstadoTutor();
    }
  }, [tutorId]);

  useEffect(() => {
    const conectarSocket = () => {
      const newSocket = io('http://127.0.0.1:8080', {
        transports: ['websocket'],
        withCredentials: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      newSocket.on('connect', () => {
        console.log('Conectado al servidor WebSocket');

        // Una vez conectado, unir al tutor a la sala adecuada
        if (tutorId !== null) {
          console.log('Uniendo al tutor a la sala:', tutorId);
          newSocket.emit('join_room', { room: tutorId });
        }
      });

      newSocket.on('disconnect', () => {
        console.log('Desconectado del servidor WebSocket');
      });


      // Manejador para actualizar el estado del tutor
      const onActualizarEstadoTutor = (data) => {
        console.log('Recibido evento actualizar_estado_tutor:', data);
        obtenerEstadoTutor();
        setSolicitudTutor({
          estado: data.estado_sala !== undefined ? data.estado_sala : null,
          confirmacion_tutor: data.confirmacion_tutor !== undefined ? data.confirmacion_tutor : null,
          alumno_nombre: data.alumno_nombre !== undefined ? data.alumno_nombre : null
        });
      };

      newSocket.on('actualizar_estado_tutor', onActualizarEstadoTutor);

      setSocket(newSocket);

      return () => {
        console.log('Desconectado del servidor WebSocket');
        newSocket.off('actualizar_estado_tutor', onActualizarEstadoTutor);
        newSocket.disconnect();
      };
    };

    if (tutorId !== null && socket === null) {
      conectarSocket();
    }
  }, [tutorId, socket]);

  useEffect(() => {
  }, [estadoTutor]);

  return (
    <>
      <div className="topBarWrapper">
        <ContadorUsuarios texto={"Alumnos en línea"} numero={200} />
        <ContadorUsuarios texto={"Alumnos en sala"} numero={100} />
        <div className="logoHomeWrapper">
          <img src="logo-metty-light.svg" alt="" />
        </div>
      </div>
      <div className="textContentWrapper">
        <h4 className="subtitle-sm">Hola {userName} ¿Qué quieres enseñar hoy?</h4>
        <p className="paragraph-m">Selecciona los temas que quieres enseñar para poder recibir solicitudes de alumnos.</p>
      </div>

      <UserSelectionModule />

      <div className="sessionWrapper">
        <CircleSwitch estadoTutor={estadoTutor} />
        <div className="tutorContent">
          <p className="mb-0">Para poder recibir solicitudes de alumnos debes establecer tu estado como conectado.</p>
          <CustomSwitch estadoTutor={estadoTutor.estado} handleChangeEstado={handleChangeEstado} />
        </div>
        estadoTutor.estado {String(estadoTutor.estado)}<br />
        estadoTutor.solicitud_entrante {String(estadoTutor.solicitud_entrante)}<br />
        estadoTutor.tutor_en_sala {String(estadoTutor.tutor_en_sala)}<br />
        solicitudTutor.estado {String(solicitudTutor.estado)}<br />
        solicitudTutor.confirmacion_tutor {String(solicitudTutor.confirmacion_tutor)}<br />
        solicitudTutor.alumno_nombre {String(solicitudTutor.alumno_nombre)}<br />


        <div className="emptyState">
          {estadoTutor?.estado === false && estadoTutor?.solicitud_entrante === false && estadoTutor?.tutor_en_sala === false && solicitudTutor?.estado === null && solicitudTutor?.confirmacion_tutor === null && (
            <>
              Aún no tienes solicitudes
            </>
          )}

          {estadoTutor?.estado === true && estadoTutor?.solicitud_entrante === false && estadoTutor?.tutor_en_sala === false && solicitudTutor?.estado === null && solicitudTutor?.confirmacion_tutor === null && (
            <>
              Aún no tienes solicitudes
            </>
          )}

          {estadoTutor?.estado === true && estadoTutor?.solicitud_entrante === true && estadoTutor?.tutor_en_sala === false && solicitudTutor?.estado === null && solicitudTutor?.confirmacion_tutor === null && (
            <>
              {String(solicitudTutor.alumno_nombre)} está esperando un tutor
              <span onClick={() => handleRechazarSolicitud(tutorId)}>Cancelar</span>
              <span onClick={() => handleAceptarSolicitud(tutorId)}>Aceptar</span>
            </>
          )}

          {estadoTutor?.estado === false && estadoTutor?.solicitud_entrante === false && estadoTutor?.tutor_en_sala === true && solicitudTutor?.estado === true && solicitudTutor?.confirmacion_tutor === true && (
            <p>Se renderiza tienes una sala pendiente</p>
          )}

          {estadoTutor?.estado === false && estadoTutor?.solicitud_entrante === false && estadoTutor?.tutor_en_sala === false && solicitudTutor?.estado === false && solicitudTutor?.confirmacion_tutor === false && (
            <>
              <p>Rechazaste la solicitud, ¿intentar buscar nuevamente?</p>
              <button onClick={handleChangeEstado} className="btn-primary btn-m">Seguir buscando</button>
            </>
          )}

          {estadoTutor?.estado === false && estadoTutor?.solicitud_entrante === false && estadoTutor?.tutor_en_sala === false && solicitudTutor?.estado === null && solicitudTutor?.confirmacion_tutor === false && (
            <>
              <p>Rechazaste la solicitud, seguir buscando?</p>
              <button onClick={handleChangeEstado} className="btn-primary btn-m">Seguir buscando</button>
            </>
          )}

          {estadoTutor?.estado === false && estadoTutor?.solicitud_entrante === false && estadoTutor?.tutor_en_sala === true && solicitudTutor?.estado === null && solicitudTutor?.confirmacion_tutor === true && (
            <>
              Aceptaste la solicitud con {String(solicitudTutor.alumno_nombre)}, ir a la sala<br />
              Ir a la sala
            </>
          )}

          {estadoTutor?.estado === false && estadoTutor?.solicitud_entrante === false && estadoTutor?.tutor_en_sala === true && solicitudTutor?.estado === null && solicitudTutor?.confirmacion_tutor === null && (
            <>
              Actualmente tienes una sala activa, haz click para ir a la sala
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TutorView;
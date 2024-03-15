import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/AppContext';
import io from 'socket.io-client';
import ContadorUsuarios from "./ContadorUsuarios";
import UserSelectionModule from './UserSelectionModule';

const AlumnoView = ({ userName }) => {
  const { store } = useContext(Context);
  const alumnoId = store.usuarioAutenticado ? store.usuarioAutenticado.id : null;
  const [estadoAlumno, setEstadoAlumno] = useState({
    estado: false,
    solicitud_saliente: false,
    alumno_en_sala: false,
  });
  const [solicitudAlumno, setSolicitudAlumno] = useState({
    estado: null,
    confirmacion_tutor: null,
    tutor_nombre: null,
  });
  const [socket, setSocket] = useState(null);


  const navigate = useNavigate();

  const obtenerEstadoAlumno = async () => {
    console.log('Llamando a obtenerEstadoAlumno');
    try {
      const response = await fetch(`http://127.0.0.1:8080/estado/alumno/${alumnoId}`);
      const data = await response.json();

      if (response.ok) {
        const { estado, solicitud_saliente, alumno_en_sala } = data.estado_alumno;

        // Utiliza el estado previo para asegurarte de que esté actualizado
        setEstadoAlumno(prevState => ({
          estado: estado,
          solicitud_saliente: solicitud_saliente,
          alumno_en_sala: alumno_en_sala
        }));
        console.log('Estado actual del alumno:', data.estado_alumno);
      } else {
        console.error('Error al obtener el estado actual del alumno:', data.error);
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
    }
  };

  const handleChangeEstado = async () => {
    const endpoint = 'alumno';
    const url = `http://127.0.0.1:8080/cambiar_estado/${endpoint}`;

    try {
      const cambiarEstadoResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [`${endpoint}_id`]: alumnoId }),
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
            body: JSON.stringify({ usuario_id: alumnoId, tipo_usuario: 'alumno' }),
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
          obtenerEstadoAlumno();
          setSolicitudAlumno({
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

  useEffect(() => {
    if (alumnoId !== null) {
      obtenerEstadoAlumno();
    }
  }, [alumnoId]);

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
        if (alumnoId !== null) {
          console.log('Uniendo al alumno a la sala:', alumnoId);
          newSocket.emit('join_room', { room: alumnoId });
        }
      });

      newSocket.on('disconnect', () => {
        console.log('Desconectado del servidor WebSocket');
      });


      // Manejador para actualizar el estado del tutor
      const onActualizarEstadoAlumno = (data) => {
        console.log('Recibido evento actualizar_estado_alumno:', data);
        obtenerEstadoAlumno();
        setSolicitudAlumno({
          estado: data.estado_sala !== undefined ? data.estado_sala : null,
          confirmacion_tutor: data.confirmacion_tutor !== undefined ? data.confirmacion_tutor : null,
          tutor_nombre: data.tutor_nombre !== undefined ? data.tutor_nombre : null
        });
      };

      newSocket.on('actualizar_estado_alumno', onActualizarEstadoAlumno);

      setSocket(newSocket);

      return () => {
        console.log('Desconectado del servidor WebSocket');
        newSocket.off('actualizar_estado_alumno', onActualizarEstadoAlumno);
        newSocket.disconnect();
      };
    };

    if (alumnoId !== null && socket === null) {
      conectarSocket();
    }
  }, [alumnoId, socket]);

  useEffect(() => {
  }, [estadoAlumno]);

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
        <h4 className="subtitle-sm">Hola {userName} ¿Qué quieres aprender hoy?</h4>
        <p className="paragraph-m">Selecciona un tema de interés y luego busca un tutor en línea para poder acceder a una sala.</p>
      </div>
      <UserSelectionModule />
      <div className="sessionWrapper">
        <div className="container d-flex flex-column">
          <h4 className="subtitle-sm"><div className="stepBadge">Paso 2</div>Busca un tutor y entra a una sala</h4>
          <p className="paragraph-m">Presiona el botón <strong>buscar un tutor en línea</strong> y espera hasta que un tutor acepte la solicitud.</p>
          {/*<div className="estadosActuales">
            estadoAlumno.estado={String(estadoAlumno.estado)} /
            estadoAlumno.solicitud_saliente={String(estadoAlumno.solicitud_saliente)} /
            estadoAlumno.alumno_en_sala={String(estadoAlumno.alumno_en_sala)} /
            solicitudAlumno.estado={String(solicitudAlumno.estado)} /
            solicitudAlumno.confirmacion_tutor={String(solicitudAlumno.confirmacion_tutor)} /
            solicitudAlumno.tutor_nombre={String(solicitudAlumno.tutor_nombre)}
          </div>*/}
        </div>

        <div className="emptyState">
          {estadoAlumno?.estado === false && estadoAlumno?.solicitud_saliente === false && estadoAlumno?.alumno_en_sala === false && solicitudAlumno?.estado === null && solicitudAlumno?.confirmacion_tutor === null && (
            <>
              <div className="sinSolicitudes">
                Aún no tienes solicitudes
              </div>
            </>
          )}

          {estadoAlumno?.estado === true && estadoAlumno?.solicitud_saliente === false && estadoAlumno?.alumno_en_sala === false && solicitudAlumno?.estado === null && solicitudAlumno?.confirmacion_tutor === null && (
            <>
              <div className="sinSolicitudes">
                Estamos buscando un tutor en línea. Esto puede tardar unos minutos...
              </div>
            </>
          )}

          {estadoAlumno?.estado === true && estadoAlumno?.solicitud_saliente === true && estadoAlumno?.alumno_en_sala === false && solicitudAlumno?.estado === null && solicitudAlumno?.confirmacion_tutor === null && (
            <>
              <div className="sinSolicitudes">
                Encontramos un tutor en línea. Esperando su confirmación...
              </div>
            </>
          )}

          {estadoAlumno?.estado === false && estadoAlumno?.solicitud_saliente === false && estadoAlumno?.alumno_en_sala === true && solicitudAlumno?.estado === true && solicitudAlumno?.confirmacion_tutor === true && (
            <>
              <div className="paragraph-m">
                {String(solicitudAlumno.tutor_nombre)} aceptó tu solicitud. ¿Quieres entrar a la sala?
              </div>
              <button
                className="btn-m btn-primary">
                Ir a la sala
              </button>
            </>
          )}

          {estadoAlumno?.estado === true && estadoAlumno?.solicitud_saliente === false && estadoAlumno?.alumno_en_sala === false && solicitudAlumno?.estado === false && solicitudAlumno?.confirmacion_tutor === false && (
            <>
              <div className="sinSolicitudes">
                El tutor no pudo aceptar tu solicitud. Seguimos buscando...
              </div>
            </>
          )}

          {estadoAlumno?.estado === false && estadoAlumno?.solicitud_saliente === false && estadoAlumno?.alumno_en_sala === true && solicitudAlumno?.estado === null && solicitudAlumno?.confirmacion_tutor === true && (
            <>
              <div className="paragraph-m">
              {String(solicitudAlumno.tutor_nombre)} acepto tu solicitud, ¿Quieres entrar a la sala?
              </div>
              <button
                className="btn-m btn-primary">
                Ir a la sala
              </button>
            </>
          )}

          {estadoAlumno?.estado === false && estadoAlumno?.solicitud_saliente === false && estadoAlumno?.alumno_en_sala === true && solicitudAlumno?.estado === null && solicitudAlumno?.confirmacion_tutor === null && (
            <>
              <div className="paragraph-m">
                Actualmente tienes una sala abierta
              </div>
              <button
                className="btn-m btn-primary">
                Ir a la sala
              </button>
            </>
          )}
        </div>

        <div className="actionWrapper">
          <button
            onClick={() => {
              if (!estadoAlumno.alumno_en_sala) {
                handleChangeEstado();
              }
            }}
            className={estadoAlumno.alumno_en_sala ? "btn-m btn-secondary text-black-50" : estadoAlumno.estado ? "btn-m btn-secondary" : "btn-m btn-primary"}>
            {estadoAlumno.alumno_en_sala ? "Buscar un tutor" : estadoAlumno.estado ? "Cancelar" : "Buscar un tutor"}
          </button>
        </div>
      </div>
    </>
  );
};

export default AlumnoView;
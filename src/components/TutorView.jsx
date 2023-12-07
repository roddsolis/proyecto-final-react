import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/AppContext';
import ContadorUsuarios from "./ContadorUsuarios";
import Categorias from "./Categorias";
import CircleSwitch from "./CircleSwitch";
import CustomSwitch from "./CustomSwitch";

const TutorView = ({ userName }) => {
  const { store } = useContext(Context);
  const tutorId = store.usuarioAutenticado ? store.usuarioAutenticado.id : null;
  const [solicitudId, setSolicitudId] = React.useState('');
  const [ultimaSolicitud, setUltimaSolicitud] = React.useState(null);
  const [estadoActualDelTutor, setEstadoActualDelTutor] = useState(false);

  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(true);

  const handleSwitchChange = () => {
    setIsActive((prevIsActive) => !prevIsActive);

    handleChangeEstado();
  };

  useEffect(() => {
    console.log("Tutor ID:", tutorId);

    const fetchUltimaSolicitud = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8080/obtener_ultima_solicitud_polling/${tutorId}`);

        if (!response.ok) {
          throw new Error(`Error al obtener la última solicitud_sala. Código de estado: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
          console.error('Error al obtener la última solicitud_sala:', data.error);
        } else {
          const ultimaSolicitud = data.ultimaSolicitud;

          if (ultimaSolicitud && ultimaSolicitud.estado === null) {
            setUltimaSolicitud(ultimaSolicitud);
            setSolicitudId(ultimaSolicitud.id.toString());
          } else {
            // Si no hay solicitud en estado None, limpiar los estados
            setUltimaSolicitud(null);
            setSolicitudId('');
          }
        }
      } catch (error) {
        console.error('Error al obtener la última solicitud_sala:', error.message);
      }
    };

    if (tutorId !== null) {
      // Llama a fetchUltimaSolicitud inmediatamente
      fetchUltimaSolicitud();

      // Establece el intervalo de polling
      const pollingInterval = setInterval(fetchUltimaSolicitud, 1000);

      // Limpia el intervalo cuando el componente se desmonta
      return () => clearInterval(pollingInterval);
    }
  }, [store.usuarioAutenticado, tutorId]);

  const handleEstadoActual = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/estado_tutor/${tutorId}`);
      const data = await response.json();

      // Utiliza setEstadoActualDelTutor para actualizar el estado
      setEstadoActualDelTutor(data.estado_tutor);

      console.log(`Estado actual del tutor: ${data.estado_tutor}`);
    } catch (error) {
      console.error('Error al obtener el estado actual del tutor:', error);
    }
  };

  useEffect(() => {
    // Este efecto se dispara cada vez que estadoActualDelTutor cambia
    // Actualiza el estado isActive basado en estadoActualDelTutor
    setIsActive(estadoActualDelTutor);
  }, [estadoActualDelTutor]);

  const handleChangeEstado = async () => {
    try {
      // Cambiar el estado del tutor
      const cambiarEstadoResponse = await fetch('http://127.0.0.1:8080/cambiar_estado_tutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tutor_id: tutorId }),
      });

      const cambiarEstadoData = await cambiarEstadoResponse.json();
      console.log(cambiarEstadoData);
    } catch (error) {
      console.error('Error al cambiar el estado del tutor:', error);
    }
  };

  const handleConfirmarSolicitud = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/confirmar_solicitud', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          solicitud_id: solicitudId,
          tipo_usuario: 'tutor',
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        // Verifica si la solicitud fue exitosa
        if (data.message === 'Confirmación exitosa y sala generada') {
          setUltimaSolicitud(data.ultimaSolicitud);
          navigate('/sala_mutua');
        } else {
          console.log('Respuesta del servidor:', data.message);
          // Puedes manejar la respuesta del servidor de acuerdo a tus necesidades
        }
      } else {
        // Muestra un mensaje de error si la solicitud no fue exitosa
        console.error('Error al confirmar la solicitud:', data.message);
      }
    } catch (error) {
      // Muestra un mensaje de error si hay un error en la solicitud
      console.error('Error al confirmar la solicitud:', error.message);
    }
  };

  const handleRechazarSolicitud = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/rechazar_solicitud', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          solicitud_id: solicitudId,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (data.message === 'Solicitud rechazada exitosamente') {
        setUltimaSolicitud(null);
        setSolicitudId('');
      }
    } catch (error) {
      console.error('Error al rechazar la solicitud:', error);
    }
  };

  const handleInputChange = (event) => {
    setSolicitudId(event.target.value);
  };

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

      <Categorias />

      <div className="sessionWrapper">
        <CircleSwitch isActive={isActive} onSwitchChange={handleSwitchChange} />
        <div className="tutorContent">
          <p className="mb-0">Para poder recibir solicitudes de alumnos debes establecer tu estado como activo.</p>
          <CustomSwitch isActive={isActive} onSwitchChange={handleSwitchChange} />
        </div>

        <div className="emptyState">
          Aún no tienes una sesión activa
        </div>
        <input type="text" value={solicitudId || (ultimaSolicitud ? ultimaSolicitud.id : '')} onChange={handleInputChange} />
        <button onClick={handleConfirmarSolicitud}>Confirmar Solicitud</button>
        <button onClick={handleRechazarSolicitud} disabled={!solicitudId}>
          Rechazar Solicitud
        </button>
      </div>
    </>
  );
};

export default TutorView;
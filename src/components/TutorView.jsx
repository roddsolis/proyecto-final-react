import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/AppContext';
import ContadorUsuarios from "./ContadorUsuarios";
import CircleSwitch from "./CircleSwitch";
import CustomSwitch from "./CustomSwitch";
import UserSelectionModule from './UserSelectionModule'

import MensajeSolicitudTutor from "./MensajeSolicitudTutor"; // Importa el componente MensajeSolicitud

const TutorView = ({ userName }) => {
  const { store } = useContext(Context);
  const tutorId = store.usuarioAutenticado ? store.usuarioAutenticado.id : null;
  const [solicitudId, setSolicitudId] = React.useState('');
  const [ultimaSolicitud, setUltimaSolicitud] = React.useState(null);
  const [estadoActualDelTutor, setEstadoActualDelTutor] = useState(false);
  const [isActive, setIsActive] = useState(estadoActualDelTutor);
  const [informacionSolicitud, setInformacionSolicitud] = useState(null);
  const navigate = useNavigate();

  const handleSwitchChange = () => {
    setIsActive((prevIsActive) => !prevIsActive);
    console.log('Nuevo estado de isActive:', !isActive); // Agrega este log
    handleChangeEstado();
  };

  const handleEstadoActual = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/estado_tutor/${tutorId}`);
      const data = await response.json();

      // Utiliza setEstadoActualDelTutor para actualizar el estado
      setEstadoActualDelTutor(data.estado_tutor);

      console.log(`Estado actual del tutor: ${data.estado_tutor}`);
      console.log('Nuevo estado de estadoActualDelTutor:', data.estado_tutor); // Agrega este log
    } catch (error) {
      console.error('Error al obtener el estado actual del tutor:', error);
    }
  };

  const fetchInformacionSolicitud = async (solicitudId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/obtener_informacion_solicitud/${solicitudId}`);
      const data = await response.json();

      if (response.ok) {
        setInformacionSolicitud(data.informacion_solicitud);
      } else {
        console.error('Error al obtener información de la solicitud:', data.message);
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
    }
  };

  const fetchUltimaSolicitud = async () => {
    try {
      console.log('Iniciando fetchUltimaSolicitud');
      const response = await fetch(`http://127.0.0.1:8080/obtener_ultima_solicitud_polling/${tutorId}`);

      if (!response.ok) {
        const responseData = await response.json();

        if (response.status === 404) {
          // Si el estado es 404, mostrar el mensaje específico en la consola
          console.log(responseData.message);
          // También podrías manejar este caso de manera específica en tu lógica
        } else {
          throw new Error(`Código de estado: ${response.status}`);
        }
      } else {
        const data = await response.json();
        const ultimaSolicitud = data.ultimaSolicitud;

        console.log('Valor de ultimaSolicitud:', ultimaSolicitud); // Agregar este log


        if (ultimaSolicitud) {
          console.log('Solicitud encontrada con estado None. Actualizando estados...');
          setUltimaSolicitud(ultimaSolicitud);
          setSolicitudId(ultimaSolicitud.id.toString());
          handleEstadoActual(); // Llama a handleEstadoActual después de actualizar ultimaSolicitud
          fetchInformacionSolicitud(ultimaSolicitud.id); // Llama a fetchInformacionSolicitud con el nuevo ID de solicitud
        } else {
          // Si no hay solicitud en estado None, limpiar los estados
          console.log('No hay solicitud en estado None. Limpiando estados...');
          setUltimaSolicitud(null);
          setSolicitudId('');
          setInformacionSolicitud(null); // Limpia también la información de la solicitud
        }
      }
    } catch (error) {
      console.warn('Error al obtener la última solicitud_sala:', error.message);
    }
  };


  useEffect(() => {
    const fetchTutorAndSetState = async () => {
      try {
        // Obtener el estado actual del tutor
        await handleEstadoActual();

        // Si el estado del tutor es activo, entonces realizar el resto de la lógica
        if (isActive) {
          // Después de obtener el estado actual, establecer el estado isActive
          setIsActive(estadoActualDelTutor);
          console.log("handleEstadoActual llamado. Nuevo estado de isActive:", estadoActualDelTutor);

          // Continuar con el resto de tu lógica, por ejemplo, fetchUltimaSolicitud
          fetchUltimaSolicitud();
        } else {
          // Si el estado del tutor no es activo, puedes realizar alguna acción adicional o simplemente salir
          console.log("El estado del tutor no es activo. No se realizará el polling interval.");
        }
      } catch (error) {
        console.error('Error al obtener el estado actual del tutor:', error);
      }
    };

    if (tutorId !== null) {
      // Llama a fetchTutorAndSetState inmediatamente
      fetchTutorAndSetState();

      // Si el estado del tutor es activo, establece el intervalo de polling
      if (isActive) {
        const pollingInterval = setInterval(fetchUltimaSolicitud, 1000);

        // Limpia el intervalo cuando el componente se desmonta
        return () => clearInterval(pollingInterval);
      }
    }
  }, [store.usuarioAutenticado, tutorId, isActive]);

  useEffect(() => {
    // Este efecto se dispara cada vez que estadoActualDelTutor cambia
    // Actualiza el estado isActive basado en estadoActualDelTutor
    setIsActive(estadoActualDelTutor);
    console.log("handleEstadoActual llamado. Nuevo estado de isActive:", estadoActualDelTutor);
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
        console.log('Estado después de rechazar la solicitud:', ultimaSolicitud);
      }
    } catch (error) {
      console.error('Error al rechazar la solicitud:', error);
    }
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

      <UserSelectionModule />

      <div className="sessionWrapper">
        <CircleSwitch isActive={isActive} onSwitchChange={handleSwitchChange} />
        <div className="tutorContent">
          <p className="mb-0">Para poder recibir solicitudes de alumnos debes establecer tu estado como activo.</p>
          <CustomSwitch isActive={isActive} onSwitchChange={handleSwitchChange} />
        </div>

        <div className="emptyState">
        <MensajeSolicitudTutor
          informacionSolicitud={informacionSolicitud}
          onConfirmarSolicitud={handleConfirmarSolicitud}
          onRechazarSolicitud={handleRechazarSolicitud}
          sinSolicitudes={ultimaSolicitud === null}
        />
    </div>
      </div>
    </>
  );
};

export default TutorView;
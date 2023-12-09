import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/AppContext';
import ContadorUsuarios from "./ContadorUsuarios";
import Categorias from "./Categorias";
import Button from "./Button";
import UserSelectionModule from './UserSelectionModule'

const AlumnoView = ({ userName }) => {
  const { store } = useContext(Context);
  const alumnoId = store.usuarioAutenticado ? store.usuarioAutenticado.id : null;
  const [solicitudId, setSolicitudId] = useState('');
  const [tutorDisponible, setTutorDisponible] = useState(false);
  const [buscandoTutor, setBuscandoTutor] = useState(false);
  const navigate = useNavigate();

  const verificarTutorDisponible = async () => {
    try {
      console.log('Realizando verificación de tutor disponible...');
      const response = await fetch('http://127.0.0.1:8080/tutor_disponible');
      const data = await response.json();

      if (data.tutor_disponible) {
        console.log('Tutor disponible:', data.tutor_id);
        setTutorDisponible(true);

        // Si hay un tutor disponible y el usuario está activamente buscando, enviar la solicitud automáticamente
        if (buscandoTutor) {
          handleEnviarSolicitud();
          // Detener la búsqueda de tutor después de enviar la solicitud
          setBuscandoTutor(false);
        }
      } else {
        console.log('No hay tutor disponible');
        setTutorDisponible(false);
      }
    } catch (error) {
      console.error('Error al verificar la disponibilidad del tutor:', error);
      // En caso de error, continuar la verificación periódica
    }
  };

  useEffect(() => {
    let intervalId;

    if (buscandoTutor) {
      // Verificar la disponibilidad del tutor cada 1 segundo si el usuario está activamente buscando
      intervalId = setInterval(() => {
        console.log('Realizando verificación de tutor disponible...');
        verificarTutorDisponible();
      }, 1000);
    }

    return () => {
      clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
    };
  }, [buscandoTutor]);

  const handleEnviarSolicitud = async () => {
    // Verificar que solicitud_saliente sea false antes de enviar la solicitud
    if (alumnoId && !store.usuarioAutenticado.solicitud_saliente) {
      try {
        console.log('Enviando solicitud de emparejamiento...');
        // Obtener la información del alumno
        const alumno = store.usuarioAutenticado;

        // Verificar si hay tutor disponible antes de enviar la solicitud
        const responseTutor = await fetch('http://127.0.0.1:8080/tutor_disponible');
        const dataTutor = await responseTutor.json();

        if (dataTutor.tutor_disponible) {
          console.log('Tutor disponible. Enviando la solicitud...');
          // Si hay un tutor disponible, enviar la solicitud
          const responseSolicitud = await fetch('http://127.0.0.1:8080/solicitud_emparejamiento', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              alumno_id: alumno.id,
            }),
          });

          const dataSolicitud = await responseSolicitud.json();
          console.log('Respuesta de la solicitud de emparejamiento:', dataSolicitud);

          if (dataSolicitud.message === 'Error en la solicitud de emparejamiento. No hay tutor disponible') {
            console.log('Tutor no disponible. Notificar al alumno.');
            // Aquí puedes mostrar un mensaje al alumno, actualizar el estado, o realizar otras acciones según tu necesidad.

            // Si el tutor rechazó la solicitud, establecer buscandoTutor en true nuevamente
            if (dataSolicitud.tutor_rechazo) {
              console.log('El tutor rechazó la solicitud. Volviendo a buscar tutor...');
              setBuscandoTutor(true);
            }
          } else {
            console.log('Solicitud de emparejamiento exitoso. Estableciendo solicitudId:', dataSolicitud.solicitud_id);
            setSolicitudId(dataSolicitud.solicitud_id);
          }
        } else {
          console.log('No hay tutor disponible');
          // Puedes mostrar un mensaje al alumno o realizar otras acciones según tu necesidad.
        }

      } catch (error) {
        console.error('Error en el emparejamiento:', error);
      }
    } else {
      console.log('No se puede enviar la solicitud. Ya hay una solicitud saliente activa.');
      // Puedes mostrar un mensaje al usuario o realizar otras acciones según tu necesidad.
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
        <h4 className="subtitle-sm">Hola {userName} ¿Qué quieres aprender hoy?</h4>
        <p className="paragraph-m">Selecciona un tema de interés y luego busca un tutor en línea para poder acceder a una sala.</p>
      </div>
      <UserSelectionModule />
      {/* <Categorias /> */}

      <div className="sessionWrapper">
        <div className="container d-flex flex-column">
          <h4 className="subtitle-sm"><div className="stepBadge">Paso 2</div>Busca un tutor y entra a una sala</h4>
          <p className="paragraph-m">Presiona el boton <strong>buscar un tutor en línea</strong> y espera hasta que un tutor acepte la solicitud.</p>
        </div>

        <div className="emptyState">
          Aún no tienes una sesión activa

          {/* Verificar tutor disponible solo después de enviar la solicitud */}
          {buscandoTutor && (
            <>
              <p>Estamos buscando un tutor en línea. Esto puede tardar unos minutos...</p>
            </>
          )}
        </div>

        <div className="actionWrapper">
          <Button btnText={buscandoTutor ? 'Detener búsqueda de tutor' : 'Buscar tutor en línea'} btnOnClick={() => setBuscandoTutor(!buscandoTutor)} className={"btn-primary btn-m"} disabled={buscandoTutor} />
        </div>
      </div>
    </>
  );
};

export default AlumnoView;
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/AppContext';
import ContadorUsuarios from "./ContadorUsuarios";
import Categorias from "./Categorias";
import Button from "./Button";

const AlumnoView = ({ userName }) => {
  const { store } = useContext(Context);
  const alumnoId = store.usuarioAutenticado ? store.usuarioAutenticado.id : null;
  const [solicitudId, setSolicitudId] = useState('');
  const [tutorDisponible, setTutorDisponible] = useState(false);
  const [buscandoTutor, setBuscandoTutor] = useState(false);
  const navigate = useNavigate();

  const verificarTutorDisponible = async () => {
    try {
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
      // Verificar la disponibilidad del tutor cada 5 segundos si el usuario está activamente buscando
      intervalId = setInterval(() => {
        verificarTutorDisponible();
      }, 3000);
    }

    return () => {
      clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
    };
  }, [buscandoTutor]);

  const handleEnviarSolicitud = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/solicitud_emparejamiento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          alumno_id: alumnoId,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (data.message === 'Error en la solicitud de emparejamiento. No hay tutor disponible') {
        console.log('Tutor no disponible. Notificar al alumno.');
        // Aquí puedes mostrar un mensaje al alumno, actualizar el estado, o realizar otras acciones según tu necesidad.
      } else {
        setSolicitudId(data.solicitud_id);
      }
    } catch (error) {
      console.error('Error en el emparejamiento:', error);
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
          tipo_usuario: 'alumno',
        }),
      });

      const data = await response.json();
      console.log(data);

      if (data.message === 'Confirmación exitosa y sala generada') {
        navigate('/sala_mutua');
      }
    } catch (error) {
      console.error('Error al confirmar la solicitud:', error);
    }
  };

  return (
    <div className="container">
      <div className="contadores">
        <ContadorUsuarios texto={"Alumnos en línea"} />
        <ContadorUsuarios texto={"Alumnos en sala"} />
      </div>

      <div className="mainContent">
        <h4 className="subtitle-sm">
          Hola {userName} ¿Qué quieres aprender hoy?
        </h4>
        <p className="paragraph-m">
          Selecciona un tema de interés y luego busca un tutor en línea para
          poder acceder a una sala
        </p>
      </div>
      <Categorias />

      <div className="sessionWrapper">
        <div className="container d-flex flex-column">
          <h4 className="subtitle-sm">Última sesión</h4>
          <p className="paragraph-m">
            Puedes acceder cuando quieras a tu sala, el historial de
            conversaciones y archivos se mantiene hasta que se inicie otra
            sesión.
          </p>
          <div className="emptyState">Aun no tienes una sesión activa</div>

          <div className="actionWrapper">
            <Button
              btnText={buscandoTutor ? 'Detener búsqueda de tutor' : 'Buscar tutor en línea'}
              className={"btn-primary btn-l"}
              btnOnClick={() => setBuscandoTutor(!buscandoTutor)}
            />
          </div>
          <div>
            <br /><br />
            <button onClick={handleConfirmarSolicitud} disabled={!tutorDisponible || !solicitudId}>
              Confirmar Solicitud
            </button>

            {/* Verificar tutor disponible solo después de enviar la solicitud */}
            {buscandoTutor && (
              <div>
                <p>Verificando la disponibilidad del tutor...</p>
                <p>Estado actual: {tutorDisponible ? 'Tutor disponible' : 'No hay tutor disponible'}</p>
              </div>

            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AlumnoView;
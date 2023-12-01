import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TutorView = () => {
  const [tutorId, setTutorId] = useState('1');
  const [solicitudId, setSolicitudId] = useState('');
  const [ultimaSolicitud, setUltimaSolicitud] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
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
          // Actualizar el estado con la última solicitud y también actualizar el input
          setUltimaSolicitud(data.ultimaSolicitud);
          setSolicitudId(data.ultimaSolicitud.id.toString());
        }
      } catch (error) {
        console.error('Error al obtener la última solicitud_sala:', error.message);
      }
    };
  
    const pollingInterval = setInterval(fetchUltimaSolicitud, 1000);
  
    return () => clearInterval(pollingInterval);
  }, [tutorId]);

  const handleChangeEstado = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/cambiar_estado_tutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tutor_id: tutorId }),
      });

      const data = await response.json();
      console.log(data);
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

      if (data.message === 'Confirmación exitosa y sala generada') {
        // Después de confirmar, actualizar el estado con la última solicitud
        setUltimaSolicitud(data.ultimaSolicitud);
        
        // Navegar a la vista de SalaMutua después de actualizar el estado
        navigate('/sala_mutua');
      } else {
        console.error('Error al confirmar la solicitud:', data.error);
      }
    } catch (error) {
      console.error('Error al confirmar la solicitud:', error);
    }
  };

  const handleInputChange = (event) => {
    // Actualizar el valor del input directamente
    setSolicitudId(event.target.value);
  };

  return (
    <div>
      <h1>Tutor View</h1>
      <button onClick={handleChangeEstado}>Cambiar Estado del Tutor</button><br /><br />
      <input type="text" value={solicitudId || (ultimaSolicitud ? ultimaSolicitud.id : '')} onChange={handleInputChange} /><br /><br />
      <button onClick={handleConfirmarSolicitud}>Confirmar Solicitud</button>
    </div>
  );
};

export default TutorView;
import React, { useState } from 'react';

const SolicitudEmparejamiento = () => {
  const [alumnoId, setAlumnoId] = useState(''); // Asegúrate de gestionar el estado del ID del alumno
  const [tutorId, setTutorId] = useState(''); // Asegúrate de gestionar el estado del ID del tutor

  const handleSolicitudEmparejamiento = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/solicitud_emparejamiento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ alumno_id: alumnoId, tutor_id: tutorId }),
      });

      const data = await response.json();
      console.log(data); // Puedes manejar la respuesta como desees

    } catch (error) {
      console.error('Error en el emparejamiento:', error);
    }
  };

  return (
    <div>
      <input type="text" value={alumnoId} onChange={(e) => setAlumnoId(e.target.value)} />
      <input type="text" value={tutorId} onChange={(e) => setTutorId(e.target.value)} />
      <button onClick={handleSolicitudEmparejamiento}>Emparejar</button>
    </div>
  );
};

export default SolicitudEmparejamiento;
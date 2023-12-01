import React, { useState } from 'react';

const SolicitarFinalizacion = () => {
  const [salaId, setSalaId] = useState(''); // Asegúrate de gestionar el estado del ID de la sala
  const [tipoUsuario, setTipoUsuario] = useState(''); // Asegúrate de gestionar el tipo de usuario ('alumno' o 'tutor')

  const handleSolicitudFinalizacion = async () => {
    try {
      const response = await fetch('http://localhost:8080/solicitar_finalizacion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sala_id: salaId, tipo_usuario: tipoUsuario }),
      });

      const data = await response.json();
      console.log(data); // Puedes manejar la respuesta como desees

    } catch (error) {
      console.error('Error en la solicitud de finalización:', error);
    }
  };

  return (
    <div>
      <input type="text" value={salaId} onChange={(e) => setSalaId(e.target.value)} />
      <input type="text" value={tipoUsuario} onChange={(e) => setTipoUsuario(e.target.value)} />
      <button onClick={handleSolicitudFinalizacion}>Solicitar Finalización</button>
    </div>
  );
};

export default SolicitarFinalizacion;
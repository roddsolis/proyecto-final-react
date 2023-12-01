import React, { useState } from 'react';

const ConfirmarSolicitud = () => {
  const [solicitudId, setSolicitudId] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [confirmaciones, setConfirmaciones] = useState({ tutor: false, alumno: false });

  const handleConfirmacion = async () => {
    try {
      const response = await fetch(`http://localhost:8080/confirmar_solicitud`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ solicitud_id: solicitudId, tipo_usuario: tipoUsuario }),
      });

      const data = await response.json();
      console.log(data);

      // Verificar las confirmaciones después de confirmar la solicitud
      await verificarConfirmaciones();

    } catch (error) {
      console.error('Error en la confirmación de la solicitud:', error);
    }
  };

  const verificarConfirmaciones = async () => {
    try {
      const response = await fetch(`http://localhost:8080/verificar_confirmaciones?solicitud_id=${solicitudId}`);
      const data = await response.json();
      console.log(data);

      // Actualizar el estado de las confirmaciones
      setConfirmaciones({ tutor: data.tutor_confirmado, alumno: data.alumno_confirmado });

      // Si ambos confirmaron, procede a actualizar la solicitud de la sala
      if (data.tutor_confirmado && data.alumno_confirmado) {
        await actualizarSolicitudSala();
      }

    } catch (error) {
      console.error('Error al verificar las confirmaciones:', error);
    }
  };

  const actualizarSolicitudSala = async () => {
    try {
      const response = await fetch('http://localhost:8080/actualizar_solicitud_sala', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ solicitud_id: solicitudId }),
      });

      const data = await response.json();
      console.log(data); // Puedes manejar la respuesta como desees

    } catch (error) {
      console.error('Error al actualizar la solicitud de sala:', error);
    }
  };

  return (
    <div>
      <input type="text" value={solicitudId} onChange={(e) => setSolicitudId(e.target.value)} />
      <input type="text" value={tipoUsuario} onChange={(e) => setTipoUsuario(e.target.value)} />
      <button onClick={handleConfirmacion}>Confirmar Solicitud</button>

      {confirmaciones.tutor && confirmaciones.alumno && (
        <div>
          <p>Ambos usuarios han confirmado. La solicitud de sala ha sido actualizada.</p>
        </div>
      )}
    </div>
  );
};

export default ConfirmarSolicitud;
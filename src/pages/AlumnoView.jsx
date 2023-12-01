import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AlumnoView = () => {
    const [alumnoId, setAlumnoId] = useState('1');
    const [solicitudId, setSolicitudId] = useState('');
    const navigate = useNavigate();

    const handleEnviarSolicitud = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8080/solicitud_emparejamiento', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    alumno_id: alumnoId,
                    tutor_id: 1, // ID del tutor ficticio, reemplázalo con el ID real si es necesario
                }),
            });

            const data = await response.json();
            console.log(data);

            if (data.message === 'Error en el emparejamiento. Tutor no disponible') {
                console.log('Tutor no disponible');
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

            // Después de confirmar, navega a la vista de SalaMutua si la confirmación es exitosa
            if (data.confirmacion_exitosa) {
                navigate('/sala_mutua');
            }
        } catch (error) {
            console.error('Error al confirmar la solicitud:', error);
        }
    };

    return (
        <div>
            <h1>Alumno View</h1>
            <button onClick={handleEnviarSolicitud}>Enviar Solicitud de Emparejamiento</button><br /><br />
            <input type="text" value={solicitudId} onChange={(e) => setSolicitudId(e.target.value)} /><br /><br />
            <button onClick={handleConfirmarSolicitud}>Confirmar Solicitud</button>
        </div>
    );
};

export default AlumnoView;
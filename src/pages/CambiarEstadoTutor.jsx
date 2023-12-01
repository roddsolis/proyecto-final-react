import React, { useState } from 'react';

const CambiarEstadoTutor = () => {
    const [tutorId, setTutorId] = useState('');

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

    return (
        <div>
            <h1>Cambiar Estado del Tutor</h1>
            <input type="text" value={tutorId} onChange={(e) => setTutorId(e.target.value)} />
            <button onClick={handleChangeEstado}>Cambiar Estado del Tutor</button>
        </div>
    );
};

export default CambiarEstadoTutor;
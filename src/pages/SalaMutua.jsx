import React, { useEffect, useState } from 'react';

const SalaMutua = () => {
    const [solicitudId, setSolicitudId] = useState('');

    useEffect(() => {
        // Aquí puedes realizar una llamada al backend para obtener información sobre la sala
        // Utiliza la solicitudId para obtener detalles de la sala desde el backend
        obtenerInformacionSala();
    }, [solicitudId]);

    const obtenerInformacionSala = async () => {
        try {
            const response = await fetch(`http://localhost:8080/sala_mutua/${solicitudId}`);
            const data = await response.json();
            console.log(data); // Puedes manejar la respuesta como desees

        } catch (error) {
            console.error('Error al obtener la información de la sala:', error);
        }
    };

    return (
        <div>
            <h1>Sala Mutua</h1>
            <p>La sala está activa. Aquí puedes agregar la información y elementos de la sala.</p>
            {/* Agrega más elementos según sea necesario */}
        </div>
    );
};

export default SalaMutua;
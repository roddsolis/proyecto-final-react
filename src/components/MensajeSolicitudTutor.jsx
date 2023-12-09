import React from 'react';

const MensajeSolicitudTutor = ({ informacionSolicitud, onConfirmarSolicitud, onRechazarSolicitud, sinSolicitudes }) => {
    if (informacionSolicitud) {
        if (!informacionSolicitud.confirmacion_tutor) {
            return (
                <div>
                    "Nombre" está esperando un tutor.
                    <div onClick={onConfirmarSolicitud}>Confirmar Solicitud</div>
                    <div onClick={onRechazarSolicitud}>Rechazar Solicitud</div>
                </div>
            );
        } else if (informacionSolicitud.confirmacion_alumno) {
            return (
                <div>
                    <p>"Nombre" quiere entrar a una sala contigo.</p>
                    <button onClick={onConfirmarSolicitud}>Confirmar Solicitud</button>
                </div>
            );
        } else if (!informacionSolicitud.confirmacion_alumno && informacionSolicitud.confirmacion_tutor) {
            return (
                <div>
                    <p>Esperando confirmación del alumno.</p>
                    <button onClick={onRechazarSolicitud}>Rechazar Solicitud</button>
                </div>
            );
        } else {
            return (
                <div>
                    <p>Mensaje por defecto.</p>
                </div>
            );
        }
    } else if (sinSolicitudes) {
        return (
            <div>
                <p>Aún no tienes solicitudes</p>
            </div>
        );
    }
    return null;
};

export default MensajeSolicitudTutor;
import React from 'react';

const MensajeSolicitudAlumno = ({ informacionSolicitud, onConfirmarSolicitud, onRechazarSolicitud, sinSolicitudes }) => {
    if (informacionSolicitud) {
        if (!informacionSolicitud.confirmacion_alumno && !informacionSolicitud.tutor) {
            return (
                <div>
                    "Nombre" está esperando un tutor.
                    <div onClick={onConfirmarSolicitud}>Confirmar Solicitud</div>
                    <div onClick={onRechazarSolicitud}>Rechazar Solicitud</div>
                </div>
            );
        } else if (!informacionSolicitud.confirmacion_tutor && informacionSolicitud.confirmacion_alumno) {
            return (
                <div>
                    <p>"Nombre" está esperandote.</p>
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

export default MensajeSolicitudAlumno;
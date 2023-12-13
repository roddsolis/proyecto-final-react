import React from "react";
import PropTypes from "prop-types";

const CircleSwitch = ({ estadoTutor }) => {
  if (!estadoTutor) {
    return null; // o proporcionar un valor predeterminado o un mensaje de error
  }

  return (
    <div className="d-flex m-0 justify-content-center align-items-center">
      <div
        className={`btn btn-light btn-circle d-flex align-items-center ${
          estadoTutor.estado ? "active" : "inactive"
        }`}
        id="loginBtn"
      >
        <div className="circle" id="circle" />
        <div className="status-text">
          {estadoTutor.estado ? "Online" : "Offline"}
        </div>
      </div>
    </div>
  );
};

CircleSwitch.propTypes = {
  estadoTutor: PropTypes.shape({
    estado: PropTypes.bool.isRequired,
    // Otras propiedades del objeto estadoTutor si las hay
  }).isRequired,
};

export default CircleSwitch;
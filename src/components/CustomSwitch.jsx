import React from "react";
import PropTypes from "prop-types";
import Switch from "@mui/material/Switch";

const CustomSwitch = ({ estadoTutor, handleChangeEstado }) => {
  const handleSwitchChange = () => {
    // Lógica para cambiar el estado o realizar alguna acción
    handleChangeEstado(!estadoTutor.estado);
  };

  return <Switch checked={estadoTutor.estado} onChange={handleSwitchChange} />;
};

CustomSwitch.propTypes = {
  estadoTutor: PropTypes.shape({
    estado: PropTypes.bool.isRequired,
    // otras propiedades si las hay
  }).isRequired,
  handleChangeEstado: PropTypes.func.isRequired,
};

export default CustomSwitch;
import PropTypes from "prop-types";
import Switch from "@mui/material/Switch";

const CustomSwitch = ({ isActive, onSwitchChange }) => {
  const handleSwitchChange = () => {
    // Lógica para cambiar el estado o realizar alguna acción
    onSwitchChange(!isActive);
  };

  return <Switch checked={isActive} onChange={handleSwitchChange} />;
};

CustomSwitch.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onSwitchChange: PropTypes.func.isRequired,
};

export default CustomSwitch;

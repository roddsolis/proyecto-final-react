import PropTypes from "prop-types";

const CircleSwitch = ({ isActive, onSwitchChange }) => {
  const handleClick = () => {
    // Lógica para cambiar el estado o realizar alguna acción
    onSwitchChange(!isActive);
  };

  return (
    <div className="d-flex m-0 justify-content-center align-items-center">
      <div className={`btn btn-light btn-circle d-flex align-items-center ${isActive ? "active" : "inactive"}`} id="loginBtn" onClick={handleClick}>
        <div className="circle" id="circle" />
        <div className="status-text">{isActive ? "Online" : "Offline"}</div>
      </div>
    </div>
  );
};

CircleSwitch.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onSwitchChange: PropTypes.func.isRequired,
};

export default CircleSwitch;

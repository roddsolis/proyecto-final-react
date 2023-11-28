import { useState } from "react";
import CustomSwitch from "./components/CustomSwitch";
import CircleSwitch from "./components/CircleSwitch";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css"; // Asegúrate de que la ruta sea correcta según la estructura de tus archivos

const App = () => {
  const [isActive, setIsActive] = useState(false);

  const handleSwitchChange = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  return (
    <>
      {/* <div className="container d-flex align-items-center justify-content-center bg-primary mx-0 px-0">
      </div> */}
      <CircleSwitch isActive={isActive} />

      <div className="container-fluid d-flex align-items-center justify-content-center">
        <p className="mb-0">Para poder recibir solicitudes de alumnos debes establecer tu estado como activo. </p>
        <CustomSwitch isActive={isActive} onSwitchChange={handleSwitchChange} />
      </div>
    </>
  );
};

export default App;

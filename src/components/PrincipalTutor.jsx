import { useState } from "react";
import Categorias from "./Categorias";
import ContadorUsuarios from "./ContadorUsuarios";
import CircleSwitch from "./CircleSwitch";
import CustomSwitch from "./CustomSwitch";
import "./../css/principalTutor.css";

const PrincipalTutor = () => {
  const [isActive, setIsActive] = useState(false);

  const handleSwitchChange = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  return (
    <>
      <div className="contadores">
        <ContadorUsuarios texto={"Alumnos en Línea"} />
        <ContadorUsuarios texto={"Alumnos en sala"} />
      </div>

      <div className="mainContent">
        <h3 className="subtitle-m">¿Qué quieres enseñar hoy?</h3>
        <p className="paragraph-m">Debes seleccionar una categoría y luego una sub-categoría para buscar un alumno y hacer match contigo.</p>
      </div>
      <Categorias />

      <div className="sessionWrapper">
        <CircleSwitch isActive={isActive} />
        <div className="container d-flex align-items-center justify-content-center">
          <p className="mb-0">Para poder recibir solicitudes de alumnos debes establecer tu estado como activo.</p>
          <CustomSwitch isActive={isActive} onSwitchChange={handleSwitchChange} />
        </div>
      </div>
    </>
  );
};

export default PrincipalTutor;

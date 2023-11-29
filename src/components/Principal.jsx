import { useState } from "react";
import Categorias from "./Categorias";
import ContadorUsuarios from "./ContadorUsuarios";
import CircleSwitch from "./CircleSwitch";
import CustomSwitch from "./CustomSwitch";
import Button from "./Button";
import "./../css/principal.css";

const PrincipalTutor = ({ tipoDeCuenta, userName }) => {
  const [isActive, setIsActive] = useState(false);

  const handleSwitchChange = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  let usuario = tipoDeCuenta;

  return (
    <>
      <div className="contadores">
        <ContadorUsuarios texto={"Alumnos en Línea"} />
        <ContadorUsuarios texto={"Alumnos en sala"} />
      </div>

      <div className="mainContent">
        <h3 className="subtitle-m">Hola {userName} ¿Qué quieres enseñar hoy?</h3>
        <p className="paragraph-m">Debes seleccionar una categoría y luego una sub-categoría para buscar un alumno y hacer match contigo.</p>
      </div>
      <Categorias />

      <div className="sessionWrapper">
        {usuario === true ? (
          <div className="container d-flex flex-column">
            <h3 className="subtitle-sm">Ultima sesión</h3>
            <p className="paragraph-m">Si deseas acceder a la informacion proporcionada por el tutor puedes ingresar nuevamente a la sala</p>
          </div>
        ) : (
          <>
            <CircleSwitch isActive={isActive} />
            <div className="container d-flex align-items-center justify-content-center">
              <p className="mb-0">Para poder recibir solicitudes de alumnos debes establecer tu estado como activo.</p>
              <CustomSwitch isActive={isActive} onSwitchChange={handleSwitchChange} />
            </div>
          </>
        )}

        <div className="emptyState"></div>

        {usuario === true ? (
          <div className="actionWrapper">
            <Button btnText={"Buscar tutor en linea"} className={"btn-primary btn-l"} />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default PrincipalTutor;

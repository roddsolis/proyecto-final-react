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
      <div className="topBarWrapper">
        <ContadorUsuarios texto={"Alumnos en línea"} numero={200}/>
        <ContadorUsuarios texto={"Alumnos en sala"} numero={100}/>
        <div className="logoHomeWrapper">
          <img src="logo-metty-light.svg" alt="" />
        </div>
      </div>
      <div className="textContentWrapper">
        <h4 className="subtitle-sm">Hola {userName} ¿Qué quieres {usuario === true ? 'aprender': 'enseñar'} hoy?</h4>
        {usuario === true ? 
        <p className="paragraph-m">Selecciona un tema de interes y luego busca un tutor en linea para poder acceder a una sala</p>
        :
        <p className="paragraph-m">Selecciona los temas que quieres enseñar para poder recibir solicitudes de alumnos.</p>}
      </div>

      <Categorias />
        
      <div className="sessionWrapper">
        {usuario === true ? (
          <div className="container d-flex flex-column">
            <h4 className="subtitle-sm">Ultima sesión</h4>
            <p className="paragraph-m">Puedes acceder cuando quieras a tu sala, el historial de conversaciones y archivos se mantiene hasta que se inicie otra sesión.</p>
          </div>
        ) : (
          <>
            <CircleSwitch isActive={isActive} />
            <div className={usuario === true ? 'tutorContent': 'alumnContent' }>
              <p className="mb-0">Para poder recibir solicitudes de alumnos debes establecer tu estado como activo.</p>
              <CustomSwitch isActive={isActive} onSwitchChange={handleSwitchChange} />
            </div>
          </>
        )}

        <div className="emptyState">
          Aun no tienes una sesión activa
        </div>

        {usuario === true ? (
          <div className="actionWrapper">
            <Button btnText={"Buscar tutor en línea"} className={"btn-primary btn-m"} />
          </div>
        ) : (
          ""
          )}
      </div>      
    </>
  );
};

export default PrincipalTutor;

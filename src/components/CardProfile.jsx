import Button from "./Button";

const CardProfile = ({iniciales,userName,userLastName,userEmail}) => {
  return (
    <>
      <div className="cardWrapper">
        <div className="profileImgWrapper">
          {/* <img src="https://picsum.photos/100" /> */}
          <div className="inicialAvatar">
            <h6 className='subtitle-m mb-0'>{iniciales}</h6>
          </div>
          <Button btnText={"Cambiar"} className={"btn-tertiary btn-m"} />
        </div>

        <div className="userPersonalInfoWrapper">
          <h5 className="subtitle-sm text-center">
            {userName} {userLastName}
          </h5>
          <p className="paragraph-s text-center">{userEmail}</p>
        </div>

        <ul className="profileUserConfigData">
          <li>
            <p className="paragraph-m mb-0"> Cambiar contraseña </p>
            <Button btnText={"cambiar"} className={"btn-tertiary btn-l"} />
          </li>

          <li>
            <p className="paragraph-m mb-0"> Datos de pago </p>
            <Button btnText={"cambiar"} className={"btn-tertiary btn-l"} />
          </li>
        </ul>

        <div className="infoNotification">
          <p className="paragraph-s mb-0">Para acceder a una sala y poder recibir una tutoría personalizada debes agregar un método de pago desde tu perfil.</p>
        </div>
        <Button btnText={"Cerrar sesion"} className={"btn-secondary btn-m"} />
        <div className="versionWrapper">
        <p className='paragraph-xs'>Versión 1.0 © Todos los derechos reservados</p>
        </div>
      </div>
    </>
  );
};

export default CardProfile;

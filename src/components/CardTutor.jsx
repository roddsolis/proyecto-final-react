import Button from "./Button";

const CardTutor = () => {
  return (
    <>
      <div className="card-profile">
        <div className="card-profile-photo">
          <img className="card-profile-photo-img" src="https://picsum.photos/80" />
          <p className="card-profile-photo-change">Cambiar</p>
        </div>
        <div className="card-profile-userdata">
          <div className="subtitle-sm">Hector Valenzuela</div>
          <div className="card-profile-userdata-mail">hectorvale@gmail.com</div>
        </div>
        <div className="card-profile-navbar">
          <div className="card-profile-navbar-navlink1">
            <div className="text-left">Cambiar contraseña</div>
            <div className="text-right blue">Cambiar</div>
          </div>
          <div className="card-profile-navbar-navlink2">
            <div className="text-left">Datos de Bancario</div>
            <Button btnText={"cambiar"} className={"btn-tertiary btn-m"} />
          </div>
        </div>

        <div className="card-profile-logout">Cerrar sesión</div>
      </div>
    </>
  );
};

export default CardTutor;

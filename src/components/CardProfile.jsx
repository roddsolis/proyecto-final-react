/* import Button from "./Button"; */

const CardProfile = () => {
  return (
    <>
      <div className="card-profile">
        <div className="card-profile-photo">
          <img className="card-profile-photo-img" src="https://picsum.photos/80" />
          <p className="card-profile-photo-change">Cambiar</p>
        </div>
        <div className="card-profile-userdata">
          <div className="subtitle-sm">Valentina Plaza</div>
          <div className="card-profile-userdata-mail">valeplaza@gmail.com</div>
        </div>
        <div className="card-profile-navbar">
          <div className="card-profile-navbar-navlink1">
            <div className="card-profile-text-left">Cambiar contraseña</div>
            <div className="card-profile-text-right card-profile-blue">Cambiar</div>
          </div>
          <div className="card-profile-navbar-navlink2">
            <div className="card-profile-text-left">Método de pago</div>
            <a href="/payingmethod" className="card-profile-text-right card-profile-blue">
              Cambiar
            </a>
          </div>
        </div>
        <div className="card-profile-important text-left">
          <p className="card-profile-important-text ">Para acceder a una sala y poder recibir una tutoría personalizada debes agregar un método de pago desde tu perfil.</p>
        </div>
        <div className="card-profile-logout">Cerrar sesión</div>
      </div>
    </>
  );
};

export default CardProfile;

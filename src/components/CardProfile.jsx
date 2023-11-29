import Button from "./Button";

const CardProfile = () => {
  return (
    <>
      <div className="card-profile bg-white border rounded-4">
        <div className="container d-flex flex-column align-items-center">
          <img className="card-profile-photo-img" src="https://picsum.photos/80" />
          <Button btnText={"cambiar"} className={"btn-tertiary btn-m"} />
        </div>

        <div className="card-profile-userdata d-flex flex-column justify-content-center ">
          <h5 className="subtitle-l text-center">Valentina Plaza</h5>
          <p className="paragraph-m text-center">valeplaza@gmail.com</p>
        </div>

        <div className="container-fluid px-0 border rounded-3 border-gray">
          <div className="d-flex align-items-center justify-content-between m-3">
            <p className="paragraph-s mb-0"> Cambiar contraseña </p>
            <Button btnText={"cambiar"} className={"btn-tertiary btn-m"} />
          </div>
          <hr className="border border-grey" />
          <div className="d-flex align-items-center justify-content-between m-3">
            <p className="paragraph-s mb-0"> Datos de pago </p>
            <Button btnText={"cambiar"} className={"btn-tertiary btn-m"} />
          </div>
        </div>

        <div className="container-fuid p-4 d-flex align-items-center border rounded-3" id="">
          <p className="paragraph-s mb-0">Para acceder a una sala y poder recibir una tutoría personalizada debes agregar un método de pago desde tu perfil.</p>
        </div>
        <Button btnText={"Cerrar sesion"} className={"btn-secondary btn-m"} />
      </div>
    </>
  );
};

export default CardProfile;

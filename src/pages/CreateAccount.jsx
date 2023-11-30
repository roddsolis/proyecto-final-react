import { FaFacebook, FaGoogle, FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useContext, useState, useEffect } from "react";
import { Context } from "../store/AppContext";
import { Check, Ban } from "lucide-react";

const CreateAccount = () => {

  const { store, actions } = useContext(Context);

  console.log(actions)

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [buttonText, setButtonText] = useState("Crear cuenta");

  const crearUnaCuenta = async () => {
    try {
      const response = await fetch(`${store.apiURL}/create-account`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo_de_usuario: null,
          nombre: name,
          apellido: lastName,
          correo: email,
          contraseña: password,
          opcion: document.querySelector('input[name="opcion"]:checked').value,
        }),
      });

      if (response.ok) {
        setRegistrationStatus("success");
        console.log("Registro exitoso");
        setShowMessage(true);
        // Cambiar el texto del botón a "Siguiente" después de un registro exitoso
        setButtonText("Siguiente");
      } else {
        setRegistrationStatus("error");
        console.log("Error al registrar");
        setShowMessage(true);
      }
    } catch (error) {
      setRegistrationStatus("error");
      console.error("Error:", error);
      setShowMessage(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
      // Restaurar el texto del botón a "Crear cuenta" después de ocultar el mensaje

      if(registrationStatus === "success"){
        setButtonText("Siguiente");
      }
      else{
        setButtonText("Crear Cuenta");
      }

    }, 5000);

    // Limpiar el temporizador al desmontar el componente
    return () => clearTimeout(timer);
  }, [showMessage, registrationStatus]);



  return (
    <>
      <div className="container-fluid d-flex p-0 h-100">
        <div className="col-6" id="createAccountImg">
          <div className="contenido">
            <h1 className="title-sm">Más de 100.00 tutores expertos en los temas mas te interesan.</h1>
            <p>Podras tener sesiones 1 a 1 con un tutor experto en los temas que necesites reforzar, aprender o resolver dudas.</p>
          </div>
        </div>

        <div className="col-6 d-flex align-items-center justify-content-center" id="formContainer">
          <form action="" method="post" className="formWrapper" onSubmit={(e) => e.preventDefault()}>
            <h3 className="title-sm">¿Que quieres hacer?</h3>

            {/* DESDE AQUI */}
            <div className="container d-flex justify-content-start p-4 mt-5 mb-5 border border-1 rounded-2">
              <div className="container">
                <div className="form-check">
                  <input type="radio" className="form-check-input" id="optionEnsenar" name="opcion" value="Quiero enseñar" />
                  <label htmlFor="optionEnsenar" className="form-check-label mx-2">
                    Quiero enseñar
                  </label>
                </div>
              </div>
              <div className="container">
                <div className="form-check">
                  <input type="radio" className="form-check-input" id="optionAprender" name="opcion" value="Quiero aprender" />
                  <label htmlFor="optionAprender" className="form-check-label mx-2">
                    Quiero aprender
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="nombre"
                id="nombre"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Apellido"
                name="apellido"
                id="apellido"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                className="form-control"
                placeholder="e-mail"
                name="correo"
                id="correo"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="contraseña"
                id="contraseña"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <div className="actionsAccountWrapper">
              <div className={`createAccountMessage ${registrationStatus === "error" ? "error" : ""}`} style={{ opacity: showMessage ? "1" : "0", transition: "opacity 0.3s ease-in-out" }}>
                {registrationStatus === "error" ? (
                  <>
                    <Ban /> Hubo un error, inténtalo nuevamente
                  </>
                ) : (
                  <>
                    <Check /> ¡Tu cuenta fue creada con éxito!
                  </>
                )}
              </div>
<<<<<<< HEAD
              <Link to={registrationStatus === "success" ? '/paymentmethod': ''}><Button btnOnClick={crearUnaCuenta} btnText={buttonText} className={"btn-primary btn-l"} /></Link>
=======
              <Button btnOnClick={crearUnaCuenta} btnText={buttonText} className={"btn-primary btn-l"} />
>>>>>>> 09d46a0f47f2d4de6f5e3435da3f79b56efa5f05
            </div>

            <div className="d-flex align-items-center justify-content-center p-3">
              <p className="paragraph-m mb-0 me-3">¿Ya tienes una cuenta?</p>
              <Link to="/login">
                <Button btnText={"ir al login"} className={"btn-tertiary btn-l"} />
              </Link>
            </div>

            <div className="text-center mt-4">
              <p>o entra con:</p>
              <button type="button" className="btn btn-link btn-floating mx-1">
                <FaFacebook />
              </button>

              <button type="button" className="btn btn-link btn-floating mx-1">
                <FaGoogle />
              </button>

              <button type="button" className="btn btn-link btn-floating mx-1">
                <FaSquareXTwitter />
              </button>

              <button type="button" className="btn btn-link btn-floating mx-1">
                <FaGithub />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;

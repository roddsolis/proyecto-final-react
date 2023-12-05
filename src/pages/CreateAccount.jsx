import { FaFacebook, FaGoogle, FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useContext, useState, useEffect } from "react";
import { Context } from "../store/AppContext";
import { Check, Ban } from "lucide-react";



const CreateAccount = () => {
  const { store } = useContext(Context);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [buttonText, setButtonText] = useState("Crear cuenta");
  const [formErrors, setFormErrors] = useState({});
  const validateInput = (inputValue) => {
    const regex = /^[A-Za-z]+$/;
    return regex.test(inputValue);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (!validateInput(value) && value !== "") {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        name: "Solo se aceptan letras en este campo",
      }));
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        name: undefined,
      }));
      setName(value);
    }
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    if (!validateInput(value) && value !== "") {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        lastName: "Solo se aceptan letras en este campo",
      }));
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        lastName: undefined,
      }));
      setLastName(value);
    }
  };


  const crearUnaCuenta = async () => {
    try {
      const errors = {};

      if (!name.trim()) {
        errors.name = "El nombre es requerido";
      }
      if (!lastName.trim()) {
        errors.lastName = "El apellido es requerido";
      }
      if (!email.trim()) {
        errors.email = "El correo es requerido";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "El correo ingresado no es válido";
      }
      if (!password.trim()) {
        errors.password = "La contraseña es requerida";
      } else if (
        !/(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(password)
      ) {
        errors.password =
          "La contraseña debe tener al menos 8 caracteres, un número, una letra y un carácter especial";
      }

      setFormErrors(errors);

      if (Object.keys(errors).length > 0) {
        console.log("Por favor completa correctamente todos los campos.");
        return;
      }

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
      setButtonText("Crear cuenta");
      // Restaurar el texto del botón a "Crear cuenta" después de ocultar el mensaje

      if (registrationStatus === "success") {
        setButtonText("Siguiente");
      } else {
        setButtonText("Crear Cuenta");
      }

    }, 5000);

    return () => clearTimeout(timer);
  }, [showMessage]);


  return (
    <>
      <div className="container-fluid d-flex p-0 h-100">
        <div className="col-6" id="createAccountImg">
          
          <div className="contenido">
          <div className="brandWrapper-account ">
            <img src="/metty-img.svg" alt="" />
          </div>
            <h1 className="title-sm">Conecta con más de 100,000 tutores expertos. Explora tus intereses con profesionales listos para potenciar tu aprendizaje.</h1>
            <p>Desbloquea tu potencial con sesiones personalizadas 1 a 1, junto a tutores expertos. Refuerza tus conocimientos, aprende de manera efectiva y resuelve tus dudas con los mejores en cada materia.</p>
          </div>

        </div>

        <div className="col-6 d-flex align-items-center justify-content-center" id="formContainer">
          <form action="" method="post" className="formWrapper" onSubmit={(e) => e.preventDefault()}>
            <h3 className="subtitle-m">¿Que quieres hacer?</h3>

            {/* DESDE AQUI */}

            <div className=" p-4 mt-5 mb-5 border border-1 rounded-2" id='selectionWrapper'>
                <div className="form-check">
                  <input type="radio" className="form-check-input" id="optionEnsenar" name="opcion" value="Quiero enseñar" />
                  <label htmlFor="optionEnsenar" className="form-check-label mx-2">
                    Quiero enseñar
                  </label>
                </div>
                <div className="form-check">
                  <input type="radio" className="form-check-input" id="optionAprender" name="opcion" value="Quiero aprender" />
                  <label htmlFor="optionAprender" className="form-check-label mx-2">
                    Quiero aprender
                  </label>
                </div>
            </div>

            <div className="mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="nombre"
                id="nombre"
                value={name}
                onChange={handleNameChange}
              />
              <div className="inputErrorText">{formErrors.name && <p className="paragraph-s text-danger mb-0">{formErrors.name}</p>}</div>
            </div>

            <div className="mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Apellido"
                name="apellido"
                id="apellido"
                value={lastName}
                onChange={handleLastNameChange}
              />
              <div className="inputErrorText">{formErrors.lastName && (<p className="paragraph-s text-danger mb-0">{formErrors.lastName}</p>)}</div>
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
              <div className="inputErrorText">{formErrors.email && (<p className="paragraph-s text-danger mb-0">{formErrors.email}</p>)}</div>              
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
              <div className="inputErrorText">{formErrors.password && (<p className="paragraph-s text-danger mb-0">{formErrors.password}</p>)}</div>
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
              <Link to={registrationStatus === "success" ? "/paymentmethod" : ""}>
                <Button btnOnClick={crearUnaCuenta} btnText={buttonText} className={"btn-primary btn-m"} />
              </Link>
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
                <FaTwitter />
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

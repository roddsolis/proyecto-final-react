import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useContext, useState, useEffect } from "react";
import { Context } from "../store/AppContext";
import { Check, Ban } from "lucide-react";
import BigCardProcess from "../components/BigCardProcess";

const CreateAccount = () => {
  let bigCardContent = {
    title: "Conecta con más de 5.000 tutores expertos. Explora tus intereses con profesionales listos para potenciar tu aprendizaje.",
    paragraph: "Desbloquea tu potencial con sesiones personalizadas 1 a 1, junto a tutores expertos. Refuerza tus conocimientos, aprende de manera efectiva y resuelve tus dudas con los mejores en cada materia.",
  };

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
      } else if (!/(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(password)) {
        errors.password = "La contraseña debe tener al menos 8 caracteres, un número, una letra y un carácter especial";
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
        setButtonText("Crear cuenta");
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [showMessage, registrationStatus]);

  return (
    <>
      <div className="createAccountContainer">
        <BigCardProcess titleContent={bigCardContent.title} paragraphContent={bigCardContent.paragraph} />

        <form action="" method="post" className="formWrapper" onSubmit={(e) => e.preventDefault()}>
          
          <div className="inputsWrapper">
            
              <h3 className="subtitle-sm w-100">¿Qué quieres hacer?</h3>
            <div className="selectionWrapper">
              
              <label htmlFor="optionEnsenar" className="form-check">
                Quiero enseñar
                <input type="radio" className="form-check-input" id="optionEnsenar" name="opcion" value="Quiero enseñar" />
              </label>
              <label htmlFor="optionAprender" className="form-check">
                Quiero aprender
                <input type="radio" className="form-check-input" id="optionAprender" name="opcion" value="Quiero aprender" />
              </label>

            </div>

            <input type="text" className="form-control" placeholder="Nombre" name="nombre" id="nombre" value={name} onChange={handleNameChange} />
            <div className="inputErrorText">{formErrors.name && <p className="paragraph-s text-danger mb-0">{formErrors.name}</p>}</div>

            <input type="text" className="form-control" placeholder="Apellido" name="apellido" id="apellido" value={lastName} onChange={handleLastNameChange} />
            <div className="inputErrorText">{formErrors.lastName && <p className="paragraph-s text-danger mb-0">{formErrors.lastName}</p>}</div>

            <input type="email" className="form-control" placeholder="e-mail" name="correo" id="correo" onChange={(e) => { setEmail(e.target.value);}} />
            <div className="inputErrorText">{formErrors.email && <p className="paragraph-s text-danger mb-0">{formErrors.email}</p>}</div>

            <input type="password" className="form-control" placeholder="Contraseña" name="contraseña" id="contraseña" onChange={(e) => { setPassword(e.target.value); }} />
            <div className="inputErrorText">{formErrors.password && <p className="paragraph-s text-danger mb-0">{formErrors.password}</p>}</div>

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
                <Button btnOnClick={crearUnaCuenta} btnText={buttonText} className={"btn-primary btn-l"} />
              </Link>
            </div>

          <div className="googleBtnAccountWrapper">
            <p className="paragraph-s mb-0">O regístrate con Google</p>
            <div className="googleBtn">
              <img src="./google-icon.svg" alt="" />
              <p className="btn-text-s mb-0">Usar mi cuenta de Google</p>
            </div>
          </div>

          </div>


          <div className="goToLoginWrapper">
            <p className="paragraph-m mb-0 me-2">¿Ya tienes una cuenta?</p>
            <Link to="/login">
              <Button btnText={"ir al login"} className={"btn-tertiary btn-l"} />
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateAccount;

import Button from "../components/Button";
import { Context } from "../store/AppContext";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Ban } from "lucide-react";
import BigCardProcess from "../components/BigCardProcess";
import GoogleButton from "../components/GoogleButton";

const Login = () => {
  let bigCardContent = {
    title: "Conecta con más de 5.000 tutores expertos. Explora tus intereses con profesionales listos para potenciar tu aprendizaje.",
    paragraph: "Desbloquea tu potencial con sesiones personalizadas 1 a 1, junto a tutores expertos. Refuerza tus conocimientos, aprende de manera efectiva y resuelve tus dudas con los mejores en cada materia.",
  };

  // usecontext maneja los datos globales de la aplicacion:
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  // const [validateAccount, setValidateAccount] = useState(null)
  // const [showMessage, setShowMessage] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [errorType, setErrorType] = useState("");

  const validarDatosDeCuenta = async () => {
    try {
      const alumnosResponse = await fetch(`${store.apiURL}alumnos`).then((response) => response.json());
      const tutoresResponse = await fetch(`${store.apiURL}tutores`).then((response) => response.json());

      const alumnos = alumnosResponse;
      const tutores = tutoresResponse;

      const usuarioEncontrado = alumnos.find((alumno) => alumno.correo === email && alumno.password === password) || tutores.find((tutor) => tutor.correo === email && tutor.password === password);

      if (usuarioEncontrado) {
        // Usuario autenticado
        // setValidateAccount(true);
        navigate("/home");

        // Aquí puedes almacenar los datos del usuario en el contexto o el estado global
        actions.setUsuarioAutenticado(usuarioEncontrado);
      } else {
        // si las credenciales no son correctas debe pasar por aca
        setOpacity(1);
        setErrorType("credenciales");
      }
    } catch (error) {
      // Hubo un error
      setOpacity(1);
      setErrorType("servidor");
    }
  };

  return (
    <>
      <div className="loginContainer">
        <BigCardProcess titleContent={bigCardContent.title} paragraphContent={bigCardContent.paragraph} />

        <form
          className="formLoginWrapper"
          onSubmit={(e) => {
            e.preventDefault(), validarDatosDeCuenta();
          }}
        >
          {/* <!--  EMAIL INPUT --> */}

          <h4 className="subtitle-sm">Inicia Sesión</h4>
          <input
            type="email"
            className="form-control"
            placeholder="e-mail"
            name="email"
            onClick={() => {
              setOpacity(0);
              setErrorType("");
            }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {/* <!--  PASSWORD INPUT --> */}
          <input
            type="password"
            className="form-control"
            placeholder="Contraseña"
            name="password"
            onClick={() => {
              setOpacity(0);
              setErrorType("");
            }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <div className="actionsLoginWrapper">
            <div className="createAccountMessage error" style={{ opacity: opacity }}>
              <Ban />
              <p className="btn-text-s mb-0">
                {errorType === "credenciales" ? "Credenciales incorrectas. Si no tienes cuenta, "
                  : errorType === "servidor" ?
                    "Hubo un error. Inténtalo más tarde." : ""}
                <Link to="/registro">regístrate</Link>
              </p>
            </div>
            <Link to={""}>
              <Button btnText={"Iniciar sesión"} btnOnClick={validarDatosDeCuenta} className="btn-primary btn-l" />
            </Link>
          </div>

          <div className="linkPassRecovery">
            <p className="paragraph-m mb-0">
              ¿Olvidaste tu contraseña? recupera tu contraseña{" "}
              <Link to="/create-account">
                <Button btnText={"aquí"} className="btn-tertiary btn-l" />
              </Link>
            </p>
          </div>

          <div className="googleBtnLoginWrapper">
            <p className="paragraph-s mb-0">O inicia sesión con Google </p>
            <GoogleButton />
          </div>

          <div className="linkCrearCuenta">
            <p className="paragraph-m mb-0">
              ¿No tienes cuenta? crea una cuenta?{" "}
              <Link to="/create-account">
                <Button btnText={"aquí"} className="btn-tertiary btn-l" />
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;

{
  /* <Button btnText={"Iniciar sesion"} className="btn-primary btn-m" btnOnClick={validarDatosDeCuenta}/> */
}

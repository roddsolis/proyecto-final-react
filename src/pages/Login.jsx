import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Button from "../components/Button";
import { Context } from "../store/AppContext";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Ban } from "lucide-react";



const Login = () => {
  // usecontext maneja los datos globales de la aplicacion:
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  // const [validateAccount, setValidateAccount] = useState(null)
  // const [showMessage, setShowMessage] = useState(false);
  const [opacity, setOpacity] = useState(0)
  const [errorType, setErrorType] = useState("");




  console.log(store, actions);
  
  const validarDatosDeCuenta = async () => {
    try {
      const alumnosResponse = await fetch(`${store.apiURL}alumnos`).then(response => response.json());
      const tutoresResponse = await fetch(`${store.apiURL}tutores`).then(response => response.json());

      const alumnos = alumnosResponse;  
      const tutores = tutoresResponse;

      const usuarioEncontrado = alumnos.find(alumno => alumno.correo === email && alumno.password === password) || tutores.find(tutor => tutor.correo === email && tutor.password === password);

      if (usuarioEncontrado) {
        // Usuario autenticado
        // setValidateAccount(true);
        navigate('/home');

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
      <div className="container-fluid d-flex p-0 h-100">
        <div className="col-6 bg-primary d-flex align-items-center justify-content-start p-5" id='loginImg'>
          <div className="col">
            <h1 className="title-sm mb-4">Bienvenido a Lorem ipsum</h1>
            <p className="paragraph-l mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, itaque accusantium odio, soluta, corrupti aliquam quibusdam tempora at cupiditate quis eum maiores libero veritatis? Dicta facilis sint aliquid ipsum atque?</p>
          </div>
        </div>
        <div className="col-6 d-flex flex-column align-items-center justify-content-center">
          <form className='w-100 h-100 d-flex flex-column justify-content-center' onSubmit={(e)=>{e.preventDefault(), validarDatosDeCuenta()}}>
            {/* <!--  EMAIL INPUT --> */}
            <div>
              <h4 className="mb-4 subtitle-l">Ingresa tus datos</h4>
            </div>
            <div className="mb-4">
              <input type="email" className="form-control" placeholder="e-mail" name="email" onChange={(e)=>{setEmail(e.target.value)}} />
            </div>
            {/* <!--  PASSWORD INPUT --> */}
            <div className="mb-4">
              <input type="password" className="form-control" placeholder="Contraseña" name="password" onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            
        <div className="actionsAccountWrapper">
        <div className="createAccountMessage error" style={{ opacity: opacity }}>
          <Ban /> <p className="btn-text-s mb-0">{
            errorType === "credenciales"
              ? "Credenciales incorrectas. Si no tienes cuenta, regístrate."
              : errorType === "servidor"
              ? "Hubo un error. Inténtalo más tarde."
              : ""
          }</p>
        </div>
        <Link to={''}>
          <Button btnText={"Iniciar sesión"} btnOnClick={validarDatosDeCuenta} className="btn-primary btn-l" />
        </Link>
      </div>

      
          </form>

          <p className='paragraph-m mb-0'>¿No tienes cuenta? crea una cuenta <Link to="/create-account"><Button btnText={"aquí"} className="btn-tertiary btn-l" /></Link></p>
          
            <div className="text-center my-4 d-flex align-items-center spacing-m">
              <p className='paragraph-m mb-0 pe-3'>O entra con: </p>
              <div className="brandsWrapper"><FaFacebook /><FaGoogle /><FaSquareXTwitter /><FaGithub />
              </div>
            </div>
          <div className="text-start my-3"><p className='paragraph-m'>Olvidaste tu contraseña?<a href="#" className="ms-2 btn-text-m">Recupérala aquí</a></p></div>
        </div>
      </div>
    </>
  );
};

export default Login;

{/* <Button btnText={"Iniciar sesion"} className="btn-primary btn-m" btnOnClick={validarDatosDeCuenta}/> */}
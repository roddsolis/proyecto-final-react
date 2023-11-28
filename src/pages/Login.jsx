import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Button from "../components/Button";
import { Context } from "../store/AppContext";
import { useContext } from "react";

const Login = () => {
  // usecontext maneja los datos globales de la aplicacion:
  const { store, actions } = useContext(Context);

  console.log(store, actions);

  return (
    <>
      <div className="container-fluid d-flex p-0 h-100">
        <div className="col-6 bg-primary d-flex align-items-center justify-content-start p-5" id='createAccountImg'>
          <div className="col">
            <h1 className="title-sm mb-4">Bienvenido a Lorem ipsum</h1>
            <p className="paragraph-l mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, itaque accusantium odio, soluta, corrupti aliquam quibusdam tempora at cupiditate quis eum maiores libero veritatis? Dicta facilis sint aliquid ipsum atque?</p>
          </div>
        </div>
        <div className="col-6 d-flex flex-column align-items-center justify-content-center">
          <form className='w-100 h-100 d-flex flex-column justify-content-center'>
            {/* <!--  EMAIL INPUT --> */}
            <div>
              <h4 className="mb-4 subtitle-l">Ingresa tus datos</h4>
            </div>
            <div className="mb-4">
              <input type="email" className="form-control" placeholder="e-mail" name="email" />
            </div>
            {/* <!--  PASSWORD INPUT --> */}
            <div className="mb-4">
              <input type="password" className="form-control" placeholder="Contrasena" name="password" />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p className='paragraph-m mb-0'>¿No tienes cuenta? crea una cuenta <Link to="/create-account"><Button btnText={"Aquí"} className="btn-tertiary btn-l" /></Link></p>
              <Button btnText={"Iniciar sesion"} className="btn-primary btn-m"/>
            </div>
          </form>
          
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

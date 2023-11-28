import { FaFacebook, FaGoogle, FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useContext, useState, useEffect } from "react";
import { Context } from "../store/AppContext";

const CreateAccount = () => {

  // usecontext maneja los datos globales de la aplicacion:
  const { store, actions } = useContext(Context);

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(store.apiURL)

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
          opcion: document.querySelector('input[name="opcion"]:checked').value
      }),
      });
  
      if (response.ok) {
        console.log("Registro exitoso");
      } else {
        console.log("Error al registrar");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {}, [actions]);

  return (
    <>
      <div className="container-fluid d-flex p-0 h-100">
        <div className="col-6 bg-primary d-flex align-items-center justify-content-center p-5">
          <div className="col">
            <h1 className="title-sm">Bienvenido a Lorem ipsum</h1>
            <p className="paragraph-l">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, itaque accusantium odio, soluta, corrupti aliquam
              quibusdam tempora at cupiditate quis eum maiores libero veritatis? Dicta facilis sint aliquid ipsum atque?
            </p>
          </div>
        </div>
        <div className="col-6 d-flex align-items-center justify-content-center">


          <form action="" method='post' className="formWrapper">
            <h3 className="title-sm">¿Que quieres hacer?</h3>

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
              <input type="text" className="form-control" placeholder="Nombre" name="nombre" id="nombre" onChange={(e) => { setName(e.target.value); }} />
            </div>
            <div className="mb-4">
              <input type="text" className="form-control" placeholder="Apellido" name="apellido" id="apellido" onChange={(e) => { setLastName(e.target.value); }} />
            </div>

            <div className="mb-4">
              <input type="email" className="form-control" placeholder="e-mail" name="correo" id="correo" onChange={(e) => { setEmail(e.target.value); }} />
            </div>
            <div className="mb-4">
              <input type="password" className="form-control" placeholder="Contraseña" name="contraseña" id="contraseña" onChange={(e) => { setPassword(e.target.value); }} />
            </div>
            <div className="d-flex justify-content-center">
            <Button btnOnClick={crearUnaCuenta} btnText={'Crear cuenta'} className={'btn-primary btn-m'}/>
            </div>

            <div className="d-flex align-items-center justify-content-center p-3">
              <p className="paragraph-m mb-0 me-3">¿Ya tienes una cuenta?</p>
              <Link to="/login">
              <Button btnText={"ir al login"} className={"btn-tertiary btn-l"}  />
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

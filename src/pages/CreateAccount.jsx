import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useContext, useState } from "react";
import { Context } from "../store/AppContext";

const CreateAccount = () => {
    
  const { store, actions } = useContext(Context);

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const crearUnaCuenta = (e) => {
        e.preventDefault()
        fetch(`${store.apiURL}/create-acount`,{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
    
                'tipo_de_usuario': null,
                'nombre': name,
                'apellido': lastName,
                'correo': email,
                'contraseña': password,
            })
        })
        .then(response =>response)
        .then(data => console.log(data))
        .catch(error => console.log(error))
        

    }
    

  return (
    <>
      <div className="container-fluid d-flex p-0 h-100">
        <div className="col-6 bg-primary d-flex align-items-center justify-content-center p-5">
          <div className="col">
            <h1 className="title-sm">Bienvenido a Lorem ipsum</h1>
            <p className="paragraph-l">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
              itaque accusantium odio, soluta, corrupti aliquam quibusdam
              tempora at cupiditate quis eum maiores libero veritatis? Dicta
              facilis sint aliquid ipsum atque?
            </p>
          </div>
        </div>
        <div className="col-6 d-flex align-items-center justify-content-center">
          <form action="" method="post" className="formWrapper">
            <h3 className="title-sm">¿Que quieres hacer?</h3>

                        <div className="container d-flex justify-content-start p-4 mt-5 mb-5 border border-1 rounded-2">
                                <div className="container">
                                <input type="radio" className="form-check-input"/>
                                <label htmlFor="connected" className="form-check-label mx-2">
                                    Quiero enseñar
                                </label>
                            </div>
                            <div className="container">
                                <input type="radio" className="form-check-input" />
                                <label htmlFor="connected" className="form-check-label mx-2">
                                    Quiero aprender
                                </label>
                            </div>
                        </div>


                   
                       <div className="mb-4">
                           <input type="text" className="form-control" placeholder="Nombre" name='nombre' id='nombre' onChange={(e)=>{setName(e.target.value)}} />
                       </div>
                       <div className="mb-4">
                           <input type="text" className="form-control" placeholder="Apellido" name='apellido' id='apellido' onChange={(e)=>{setLastName(e.target.value)}} />
                       </div>
                   
                   <div className="mb-4">
                       <input type="email" className="form-control" placeholder="e-mail" name="correo" id='correo' onChange={(e)=>{setEmail(e.target.value)}} />
                   </div>
                   <div className="mb-4">
                       <input type="password" className="form-control" placeholder="Contraseña" name="constraseña" id='contraseña'onChange={(e)=>{setPassword(e.target.value)}}/>
                   </div>
                   <div className="d-flex  justify-content-center">
                       <input type='submit' value='registrar'></input>
                   </div>

            <div className="d-flex align-items-center justify-content-center p-3">
              <p className="paragraph-m mb-0 me-3">¿Ya tienes una cuenta?</p>
              <Link to="/login">
                <Button
                  btnText={"ir al login"}
                  className={"btn-tertiary btn-l"}
                  btnOnClick={crearUnaCuenta()}
                />
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

{
  /* <Button btnText={'Obtener cuenta'} className="btn-primary btn-m"/> */
}

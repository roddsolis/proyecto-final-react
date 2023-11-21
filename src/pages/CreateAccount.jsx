import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import {Link} from "react-router-dom";
import Button from "../components/Button";

const CreateAccount = () => {

  return (
    <>
        <section className="background-radial-gradient overflow-hidden">
        {/* <!-- Jumbotron --> */}
        <div className="px-4 py-5 px-md-5 text-center text-lg-start" style={{backgroundColor: '#beef00'}}>
            <div className="container">
                <div className="row gx-lg-5 align-items-center">
                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <h1 className="title-sm">
                            Bienvenido a <br />
                            <span className="businessText">Lorem ipsum</span>
                        </h1>
                        <p className="paragraph-m" style={{color: '#1400c6'}}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                            quibusdam tempora at cupiditate quis eum maiores libero
                            veritatis? Dicta facilis sint aliquid ipsum atque?
                        </p>
                    </div>

                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <div className="card">
                            <div className="card-body py-5 px-md-5">
                                <form>
                                    {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                                    <div className="row mb-3">
                                        <h5 className="text-center mb-5">Que quieres hacer?</h5>
                                        <div className="col-md-6 mb-4 text-center">
                                            <input type="radio" className="form-check-input" checked/>
                                            <label htmlFor="connected" className="form-check-label mx-2">
                                                Quiero enseñar
                                            </label>
                                        </div>
                                        <div className="col-md-6 mb-4 text-center">
                                            <input type="radio" className="form-check-input" />
                                            <label htmlFor="connected" className="form-check-label mx-2">
                                                Quiero aprender
                                            </label>
                                        </div>
                                    </div>
                                    {/* <!--2 column grid con NOMBRE y APELLIDO --> */}
                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <input type="name" className="form-control" placeholder="Nombre" />
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <input type="apellido" className="form-control" placeholder="Apellido" />
                                        </div>
                                    </div>
                                    {/* <!--  EMAIL INPUT --> */}
                                    <div className="mb-4">
                                        <input type="email" className="form-control" placeholder="e-mail" name="email" />
                                    </div>
                                    {/* <!--  PASSWORD INPUT --> */}
                                    <div className="mb-4">
                                        <input type="password" className="form-control" placeholder="Contraseña"
                                            name="password" />
                                    </div>
                                    <div className="d-flex  justify-content-center">
                                        <Button btnText={'Registrate'} className="btn-primary btn-s"/>
                                    </div>

                                    <div className="text-start my-3">
                                        <span>
                                            Ya tienes una cuenta?
                                            <Link to='/login'>Login</Link>
                                        </span>
                                    </div>

                                    {/* <!--  RRSS --> */}
                                    <div className="text-center mt-4" >
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
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Jumbotron --> */}
    </section>
    </>
  )
}

export default CreateAccount

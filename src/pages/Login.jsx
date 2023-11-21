import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Button from "../components/Button";
const Login = () => {
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
                                    {/* <!--  EMAIL INPUT --> */}
                                    <div>
                                        <h4 className="mb-4">Completa los campos</h4>
                                    </div>
                                    <div className="mb-4">
                                        <input type="email" className="form-control" placeholder="e-mail" name="email" />
                                    </div>
                                    {/* <!--  PASSWORD INPUT --> */}
                                    <div className="mb-4">
                                        <input type="password" className="form-control" placeholder="Contrasena"
                                            name="password" />
                                    </div>
                                    <div className="text-start my-3">
                                        <span>
                                            Olvidaste tu contrasena?
                                            <a href="./pages/CreateAccount.jsx" className="ms-2">
                                                Recuperarla
                                            </a>
                                        </span>
                                    </div>
                                    <div className="d-flex  justify-content-center">
                                        <Button btnText={'Login'} className="btn-primary btn-s"/>
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

export default Login

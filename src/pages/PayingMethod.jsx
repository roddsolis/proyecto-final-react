import Button from "../components/Button";
import { Link } from "react-router-dom";

function PayingMethod() {
  return (
    <div className="container-fluid d-flex p-0 h-100">
      <div className="col-6 bg-primary d-flex align-items-center justify-content-center p-5">
        <div className="col">
          <h1 className="title-sm text-light">Bienvenido a Metty</h1>
          <p className="paragraph-l text-light">Descubre Metty de forma gratuita y sumérgete en una experiencia única. Para acceder a funciones exclusivas y contenido premium, explora nuestras opciones de suscripción.</p>
          <p className="paragraph-l text-light">
            <strong>¡Eleva tu experiencia con Metty hoy mismo!</strong>
          </p>
        </div>
      </div>
      <div className="col-6 d-flex align-items-center justify-content-center">
        <form action="" method="post" className="formWrapper">
          <h3 className="title-sm mb-5 text-center">Pago</h3>
          {/* Aquí puedes añadir los campos y elementos del formulario de pago */}
          <div className="container d-flex justify-content-start p-4 mt-5 mb-3 border border-1 rounded-2">
            <div className="container">
              <div className="form-check">
                <input type="radio" className="form-check-input" id="optionAprender" />
                <label htmlFor="optionAprender" className="form-check-label mx-2">
                  Tarjeta de debito
                </label>
              </div>
            </div>
            <div className="container">
              <div className="form-check">
                <input type="radio" className="form-check-input" id="optionAprender" />
                <label htmlFor="optionAprender" className="form-check-label mx-2">
                  Tarjeta de credito
                </label>
              </div>
            </div>
            <div className="container">
              <div className="form-check">
                <input type="radio" className="form-check-input" id="optionAprender" />
                <label htmlFor="optionAprender" className="form-check-label mx-2">
                  Mercado pago
                </label>
              </div>
            </div>
          </div>

          <div className="row gy-3 mb-5">
            <div className="col-md-6">
              <label htmlFor="cc-name" className="form-label"></label>
              <input type="text" className="form-control" id="cc-name" placeholder="Nombre del titular" required />
              <div className="invalid-feedback">Se requiere el nombre en la tarjeta</div>
            </div>

            <div className="col-md-6">
              <label htmlFor="cc-number" className="form-label"></label>
              <input type="text" className="form-control" id="cc-number" placeholder=" Número de tarjeta" required />
              <div className="invalid-feedback">Se requiere número de tarjeta de crédito</div>
            </div>

            <div className="col-md-3">
              <label htmlFor="cc-expiration" className="form-label"></label>
              <input type="text" className="form-control" id="cc-expiration" placeholder="mm/aa" required />
              <div className="invalid-feedback">Fecha de vencimiento requerida</div>
            </div>

            <div className="col-md-3">
              <label htmlFor="cc-cvv" className="form-label"></label>
              <input type="text" className="form-control" id="cc-cvv" placeholder="cvv" required />
              <div className="invalid-feedback">Código de seguridad requerido</div>
            </div>
          </div>
          <hr className="my-0" />
          <div className="row gy-3  d-flex justify-content-between">
            <div className="containerBtn">
              <Link to="/login">
                <Button btnText={"Omitir"} className={"btn-secondary btn-m mt-5"} />
              </Link>

              <Link to="#">
                <Button btnText={"Guardar"} className={"btn-primary btn-m mt-5"} />
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PayingMethod;

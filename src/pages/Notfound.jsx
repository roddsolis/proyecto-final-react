import { Link } from "react-router-dom";
import Button from "../components/button";
import "./../css/notFound.css";

const Notfound = () => {
  return (
    <>
      <div id="error-page">
        <div className="content">
          {/* CAMBIAR EL NUMERO DE ACUERDO AL ERROR */}
          <h2 className="header">404</h2>
          <h4 data-text="Ups! Pagina no encontrada">Ups! Pagina no encontrada</h4>
          <p>Disculpa, no sabemos que ha pasado.</p>
          <div className="btns p-2">
            <Link to="/home">
              <Button btnText={"Comenzar Ahora"} className={"btn-primary btn-m"} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notfound;

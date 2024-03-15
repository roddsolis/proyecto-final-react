import { Link } from "react-router-dom";
import Button from "../components/button";

const Start = () => {

  return (
    <>
      <div className="startWrapper">
        <img src="/student.png" alt="" className="startImg" />
        <div className="contentWrapper">
          <h3 className="title-sm">Bienvenidos a <img src="./logo-metty-light.svg" alt="" /></h3>
          <p className="paragraph-m">
            Descubre la primera plataforma de tutorías <strong>uno a uno</strong> que te conecta en tiempo real con más de <strong>5.000 expertos</strong>. Aquí, puedes compartir tus conocimientos, resolver dudas sobre temas de tu interés y, <strong>¿por qué no?</strong>, aprender algo
            completamente nuevo. ¡Inicia tu experiencia ahora y explora un mundo de posibilidades!
          </p>
          <div className="ctaContentWrapper">
            <Link to="/create-account">
              <Button btnText={"Comenzar Ahora"} className={"btn-primary btn-l"} />
            </Link>
            <Link to="/login">
              <Button btnText={"Ya tengo una cuenta"} className={"btn-secondary btn-l"} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Start;
/* 

<div className="startWrapper d-flex flex-column d-sm-flex flex-sm-column d-md-flex flex-md-row bg-success">
        <div className="imgWrapper bg-warning">
        <img src="/student.png" alt="" className="startImg" />
        </div>
        <div className="contentWrapper">
          <h3 className="title-sm">Bienvenidos a Metty</h3>
          <p className="paragraph-m">
            Descubre la primera plataforma de tutorías <strong>uno a uno</strong> que te conecta en tiempo real con más de <strong>100,000 expertos</strong>. Aquí, puedes compartir tus conocimientos, resolver dudas sobre temas de tu interés y, <strong>¿por qué no?</strong>, aprender algo
            completamente nuevo. ¡Inicia tu experiencia ahora y explora un mundo de posibilidades!
          </p>
          <div className="ctaContentWrapper">
            <Link to="/create-account">
              <Button btnText={"Comenzar Ahora"} className={"btn-primary btn-l"} />
            </Link>
            <Link to="/login">
              <Button btnText={"Ya tengo una cuenta"} className={"btn-secondary btn-l"} />
            </Link>
          </div>
        </div>
      </div> */

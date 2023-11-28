import Categorias from "./Categorias";
import ContadorUsuarios from "./ContadorUsuarios";
import Button from "./Button";

const Principal = () => {
  return (
    <>
      <div className="contadores">
        <ContadorUsuarios texto={"Tutores en Línea"} />
        <ContadorUsuarios texto={"Tutores Ocupados"} />
        <ContadorUsuarios texto={"Tutores Disponibles"} />
      </div>

      <div className="mainContent pb-0">
        <h3 className="subtitle-m">¿Que quieres aprender?</h3>
        <p className="paragraph-s">Debes seleccionar una categoria y luego una sub-categoria para buscar un tutor en linea y haremos match con el tutor que mejor se adapte a tu necesidad</p>
      </div>
      <Categorias />

      <div className="sessionWrapper">
        <h3 className="subtitle-sm">Ultima Sesion</h3>
        <p className="paragraph-m">Si deseas acceder a la informacion proporcionada por el tutor puedes ingresar nuevamente a la sala</p>
        <div className="actionWrapper">
          <Button btnText={"Buscar tutor en linea"} className={"btn-primary btn-l"} />
        </div>
      </div>
    </>
  );
};

export default Principal;

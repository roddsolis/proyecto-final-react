import Button from "../components/Button";
import { Link } from "react-router-dom";
import CardGenerator from "../components/Card-Generator";
import BigCardProcess from "../components/BigCardProcess";
import { AlertTriangle } from "lucide-react";

function PayingMethod() {
  return (
    <div className="payingMethodContainer">
      <BigCardProcess />
      <form action="" method="post" className="payFormWrapper">
        <div className="paymentInfoWrapper">
          <h3 className="subtitle-sm w-100">Ingresa tu tarjeta de crédito</h3>
        </div>

        <CardGenerator />

        <div className="paymentMethodActions">
          <Link to="/login">
            <Button btnText={"Omitir"} className={"btn-secondary btn-m"} />
          </Link>

          <Link to="#">
            <Button btnText={"Guardar"} className={"btn-primary btn-m"} />
          </Link>
        </div>
        <div className="inforWarning">
          <AlertTriangle size={40} color="#c78709" />
          <p className="paragraph-xs">Los cobros por cada sesión finalizada con éxito serán cargados a tu tarjeta de crédito. Puedes omitir este paso, pero ten en cuenta que no podrás ingresar a una sala si no agregas un método de pago.</p>
        </div>
      </form>
    </div>
  );
}

export default PayingMethod;
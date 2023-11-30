import { useState } from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";

function TutorBankData() {
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedAccountType, setSelectedAccountType] = useState("");
  const [numeroCuenta, setNumeroCuenta] = useState("");

  const handleBankChange = (event) => {
    setSelectedBank(event.target.value);
  };

  const handleAccountTypeChange = (event) => {
    setSelectedAccountType(event.target.value);
  };

  const handleNumeroCuentaChange = (event) => {
    setNumeroCuenta(event.target.value);
  };

  return (
    <div className="container-fluid d-flex p-0 h-100">
      <div className="col-6 bg-primary d-flex align-items-center justify-content-center p-5">
        <div className="col">
          <h1 className="title-sm">Bienvenido a Lorem ipsum</h1>
          <p className="paragraph-l">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, itaque accusantium odio, soluta, corrupti aliquam quibusdam tempora at cupiditate quis eum maiores libero veritatis? Dicta facilis sint aliquid ipsum atque?</p>
        </div>
      </div>
      <div className="col-6 d-flex align-items-center justify-content-center">
        <form className="w-100">
          <h3 className="title-sm mb-5 text-center">Pago</h3>
          <div className="mb-3">
            <input className="form-control mb-3" placeholder="Rut" id="exampleid" aria-describedby="emailHelp" />

            <input type="email" className="form-control" placeholder="e-mail" id="exampleInputPassword1" />
          </div>

          {/* SELECCION DE BANCO */}
          <div className="mb-3">
            <select className="form-select" aria-label="Default select example" value={selectedBank} onChange={handleBankChange}>
              <option value="">Selecciona un banco</option>
              <option value="1">Falabella</option>
              <option value="2">Itau</option>
              <option value="3">Bci</option>
              <option value="4">Banco de Chile</option>
            </select>
          </div>

          {/* SELECCION DE TIPO DE CUENTA */}
          <div className="mb-3">
            <select className="form-select" aria-label="Default select example" value={selectedAccountType} onChange={handleAccountTypeChange}>
              <option value="">Tipo de cuenta</option>
              <option value="1">Corriente</option>
              <option value="2">Vista</option>
              <option value="3">Ahorro</option>
            </select>
          </div>

          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Ingrese el número de cuenta" id="numeroCuenta" aria-describedby="numeroCuentaHelp" value={numeroCuenta} onChange={handleNumeroCuentaChange} />
            <div id="numeroCuentaHelp" className="form-text"></div>
          </div>
          <div className="containerBtn">
            <Link to="/login">
              <Button btnText={"Omitir"} className={"btn-secondary btn-m mt-5"} />
            </Link>

            <Link to="#">
              <Button btnText={"Guardar"} className={"btn-primary btn-m mt-5"} />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TutorBankData;

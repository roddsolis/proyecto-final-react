import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import "./../css/card-generator.css";

const CardGenerator = () => {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    // Lógica para limitar la entrada del usuario en los campos específicos
    if ((name === "number" && value.length > 16) || (name === "expiry" && value.length > 4) || (name === "cvc" && value.length > 3)) {
      return;
    }

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  return (
    <div className="payment-form-container">
      <Cards number={state.number} expiry={state.expiry} cvc={state.cvc} name={state.name} focused={state.focus} />
      <form className="credit-card-form">
        <div className="form-group">
          <label htmlFor="number">Card Number</label>
          <input type="number" name="number" placeholder="Card Number" maxLength="16" value={state.number} onChange={handleInputChange} onFocus={handleInputFocus} />
        </div>
        <div className="form-group">
          <label htmlFor="name">Cardholder Name</label>
          <input type="text" name="name" placeholder="Cardholder Name" value={state.name} onChange={handleInputChange} onFocus={handleInputFocus} />
        </div>
        <div className="form-group">
          <label htmlFor="expiry">mm/yy Expiry</label>
          <input type="text" name="expiry" placeholder="mm/yy " maxLength="4" value={state.expiry} onChange={handleInputChange} onFocus={handleInputFocus} />
        </div>
        <div className="form-group">
          <label htmlFor="cvc">CVC</label>
          <input type="number" name="cvc" placeholder="CVC" maxLength="3" value={state.cvc} onChange={handleInputChange} onFocus={handleInputFocus} />
        </div>
      </form>
    </div>
  );
};

export default CardGenerator;

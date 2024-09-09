import { useState } from "react";
import Cards from "react-credit-cards-2"; //ESTO NO SE TIENE QUE MOVER
import "react-credit-cards-2/dist/es/styles-compiled.css"; //ESTO NO SE TIENE QUE MOVER

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
    <div className="payingInputsWrapper">
      <Cards number={state.number} expiry={state.expiry} cvc={state.cvc} name={state.name} focused={state.focus} />
      <form className="creditCardData">
        
          <input className='form-control' type="text" name="name" placeholder=" Nombre" value={state.name} onChange={handleInputChange} onFocus={handleInputFocus} />
          <input className='form-control' type="number" name="number" placeholder=" Nro Tarjeta" maxLength="16" value={state.number} onChange={handleInputChange} onFocus={handleInputFocus} />
          <div className="twoColumns">
          <input className='form-control' type="text" name="expiry" placeholder=" mm/aa " maxLength="4" value={state.expiry} onChange={handleInputChange} onFocus={handleInputFocus} />
          <input className='form-control' type="number" name="cvc" placeholder=" CVC" maxLength="3" value={state.cvc} onChange={handleInputChange} onFocus={handleInputFocus} />
          </div>
        
      </form>
    </div>
  );
};

export default CardGenerator;

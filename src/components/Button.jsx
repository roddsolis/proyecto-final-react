import '../css/buttons.css'
import PropTypes from 'prop-types';


const Button = ( {btnText, className, onClick }  ) => {

 return <button className={ className } onClick={onClick}>{ btnText }</button>
  
};

Button.propTypes = {
    btnText: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.func.isRequired,
  };

export default Button



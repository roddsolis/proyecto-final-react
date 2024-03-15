

const Button = ( { btnText, className, btnOnClick }  ) => {

 return <button className={ className } onClick={btnOnClick}>{ btnText }</button>
  
};



export default Button



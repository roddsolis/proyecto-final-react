import {Link} from 'react-router-dom'
const Start = () => {
  return (
    <>
      <div className="centrado">

        Esta es la página de inicio que lo deriva a crear cuenta o inciar sesion
        
        <Link to='/create-acount'>¡Comenzar ahora!</Link>
        <Link to='/login'>Ya tengo una cuenta</Link> 
       

      </div>
    </>
  )
}

export default Start

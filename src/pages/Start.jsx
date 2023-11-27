import {Link} from 'react-router-dom'
import Button from '../components/button'

const Start = () => {
  return (
    <>
      
     <div className="startWrapper">
     
        <img src="../public/student.png" alt="" />
     <div className="contentWrapper">
     <h3 className='title-sm'>Bienvenido a Metty</h3>
      <p className='paragraph-m'>Descubre la primera plataforma de tutorías <strong>uno a uno</strong> que te conecta en tiempo real con más de <strong>100,000 expertos</strong>. Aquí, puedes compartir tus conocimientos, resolver dudas sobre temas de tu interés y, <strong>¿por qué no?</strong>, aprender algo completamente nuevo. ¡Inicia tu experiencia ahora y explora un mundo de posibilidades!</p>
      <div className="ctaWrapper">
      <Link to="/create-acount"><Button btnText={"Comenzar Ahora"}className={"btn-primary btn-l"}/></Link>
      <Link to="/login"><Button btnText={"Ya tengo una cuenta"}className={"btn-secondary btn-l"}/></Link>
      </div>
      
     </div>
      </div> 

        

    </>
  )
}

export default Start


/*    <div className="imgWrapper"></div>
   <div className="contentWrapper">
  
   <Button btnText={'¡Comenzar ahora!'} className={'btn-primary'} to='/create-acount'><Link to='/create-acount'></Link></Button>
   <Link to='/login'>Ya tengo una cuenta</Link> 
   </div> */
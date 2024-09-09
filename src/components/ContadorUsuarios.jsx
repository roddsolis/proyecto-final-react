
const ContadorUsuarios = ({texto, numero}) => {

    return (
        <div className="counterWrapper">
          <h6 className="btn-text-s mb-0">{numero}</h6>
          <p className='paragraph-s mb-0 px-2'>{texto}</p>
        </div>
      );

}

export default ContadorUsuarios

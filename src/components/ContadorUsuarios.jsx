import { useState, useEffect } from "react";

const ContadorUsuarios = ({texto}) => {

    const [usuariosConectados, setUsuariosConectados] = useState(0);

    // Simulador de cambios en el contador (solo para propósitos visuales)
    useEffect(() => {
      const interval = setInterval(() => {
        setUsuariosConectados(
          (prevUsuarios) => prevUsuarios + Math.floor(Math.random() * 3)
        ); // Simulación de cambio aleatorio
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    return (
        <div className="counterWrapper">
          <p className="paragraph-s mb-0"> <strong>{usuariosConectados}</strong> </p>
          <p className='paragraph-s mb-0 px-2'>{texto}</p>
        </div>
      );

}

export default ContadorUsuarios

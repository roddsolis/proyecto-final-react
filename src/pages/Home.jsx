import CardProfile from "../components/CardProfile";
import Principal from "../components/Principal";
import { useEffect, useState, useContext } from "react";
import { Context } from "../store/AppContext";

const Home = () => {
  const { store } = useContext(Context);
  const usuarioAutenticado = store.usuarioAutenticado;

  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [ homeCharge, setHomeCharge] = useState("charge")

  
  useEffect(() => {
    setTimeout(() => {
      setHomeCharge("")
    }, 4000);
    if (usuarioAutenticado) {
      setUserEmail(usuarioAutenticado.correo);
      setUserName(usuarioAutenticado.nombre);
      setUserLastName(usuarioAutenticado.apellidos);
    }
  }, [usuarioAutenticado]);

  let inicialNombre = userName.charAt(0).toUpperCase()
  let inicialApellido = userLastName.charAt(0).toUpperCase()

  let iniciales = inicialNombre+inicialApellido

  return (
    <>
      <div className={`homeWrapper ${homeCharge}`}>

        <div className="profileWrapper">
          <CardProfile userEmail={userEmail} userName={userName} userLastName={userLastName} iniciales={iniciales}/>
        </div>

        <div className="mainWrapper">
        <Principal tipoDeCuenta={usuarioAutenticado.cuenta} userName={userName} userLastName={userLastName} />
        </div>

      </div>
    </>
  );
};

export default Home;
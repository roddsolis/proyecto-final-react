import CardProfile from "../components/CardProfile";
import Principal from "../components/Principal";
import { useEffect, useState, useContext } from "react";
import {Context} from '../store/AppContext'

const Home = () => {


  const {store, actions} = useContext(Context)
  const usuarioAutenticado = store.usuarioAutenticado;

  console.log(store, actions)
  
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");

  console.log(usuarioAutenticado.cuenta)

  useEffect(() => {
    if (usuarioAutenticado) {
      setUserEmail(usuarioAutenticado.correo);
      setUserName(usuarioAutenticado.nombre);
      setUserLastName(usuarioAutenticado.apellidos);
    }
  }, [usuarioAutenticado]);
  
  return (
    <>
      <div className="fluid d-flex" style={{ height: "100vh" }}>
        <div className="col-3 bg-light d-flex align-item-center justify-content-center p-4">
          <CardProfile userEmail={userEmail} userName={userName} userLastName={userLastName} />
        </div>
        <div className="col-9 p-5">
          <Principal tipoDeCuenta={usuarioAutenticado.cuenta} userName={userName} userLastName={userLastName}/>
        </div>
      </div>
    </>
  );
};

export default Home;

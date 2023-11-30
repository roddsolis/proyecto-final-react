import CardProfile from "../components/CardProfile";
import Principal from "../components/Principal";
import { useEffect, useState } from "react";

const Home = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8080/alumnos")
      .then((response) => response.json())
      .then((data) => {
        setUserEmail(data[0].correo);
        setUserName(data[0].nombre);
        setUserLastName(data[0].apellidos);
        console.log(data[0].nombre);
      })
      .catch((err) => err);

    fetch("http://127.0.0.1:8080/tutores")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => err);
  }, []);

  return (
    <>
      <div className="fluid d-flex" style={{ height: "100vh" }}>
        <div className="col-3 bg-light d-flex align-item-center justify-content-center p-4">
          <CardProfile userEmail={userEmail} userName={userName} userLastName={userLastName} />
        </div>
        <div className="col-9 p-5">
          <Principal tipoDeCuenta={false} userName={userName} />
        </div>
      </div>
    </>
  );
};

export default Home;

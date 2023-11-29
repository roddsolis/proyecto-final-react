import Principal from "../components/Principal";

const Home = () => {
  fetch("http://127.0.0.1:8080/alumnos")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => err);

  return (
    <>
      <div className="fluid d-flex" style={{ height: "100vh" }}>
        <div className="col-3 bg-light d-flex align-item-center justify-content-center p-4">{/* <CardTutor /> */}</div>
        <div className="col-9 p-5">
          <Principal tipoDeCuenta={false} />
        </div>
      </div>
    </>
  );
};

export default Home;

import CardTutor from "../components/CardTutor";
import PrincipalTutor from "../components/PrincipalTutor";

const HomeTutor = () => {
  return (
    <>
      <div className="fluid d-flex" style={{ height: "100vh" }}>
        <div className="col-3 bg-light d-flex align-item-center justify-content-center p-4">
          <CardTutor />
        </div>
        <div className="col-9 p-5">
          <PrincipalTutor />
        </div>
      </div>
    </>
  );
};

export default HomeTutor;

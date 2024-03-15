import AlumnoView from "./AlumnoView";
import TutorView from "./TutorView";
import "./../css/principal.css";

const PrincipalTutor = ({ tipoDeCuenta, userName, userLastName }) => {
  
  let usuario = tipoDeCuenta;
  let nombre = userName;
  let apellido = userLastName;
  
  if (usuario === true) {
    return (
      <>
        <AlumnoView userName={userName} />
      </>
    );
  } else {
    return (
      <>
        <TutorView userName={userName} />
      </>
    );
  }
};

export default PrincipalTutor;
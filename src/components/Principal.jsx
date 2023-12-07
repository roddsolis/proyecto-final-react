import AlumnoView from "./AlumnoView";
import TutorView from "./TutorView";
import "./../css/principal.css";

const PrincipalTutor = ({ tipoDeCuenta, userName, userLastName }) => {
  
  let usuario = tipoDeCuenta;
  let nombre = userName;
  let apellido = userLastName;
  console.log(nombre, apellido);
  console.log(nombre.charAt(0).toUpperCase() + nombre.slice(1));
  console.log(apellido);

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
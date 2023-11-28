import { useState } from "react";
const Categorias = () => {
  const [botonSeleccionado, setBotonSeleccionado] = useState(null);

  const handleBotonClick = (nombreBoton) => {
    setBotonSeleccionado(nombreBoton);
  };

  const nombresDeBotones = ["JavaScript", "HTML5", "React", "Node JS", "CSS", "Angular", "Python", "Next", "Java", "PHP", "MySQL", "TypeScript"];

  return (
    <>
      <div className="categoryWrapper container-fluid mb-3">
        <h3 className="subtitle-sm">Selecciona una categoria</h3>
        <div className="chipsWrapper">
          {nombresDeBotones.map((nombre, index) => (
            <button
              key={index}
              onClick={() => handleBotonClick(nombre)}
              style={{
                padding: "0.6em 1.2em",
                borderRadius: "100px",
                border: "1px solid #e5ebef",
                backgroundColor: botonSeleccionado === nombre ? "#e7effd" : "white",
                color: botonSeleccionado === nombre ? "#0E4FC8" : "#708396",
              }}
            >
              <strong>{nombre}</strong>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categorias;

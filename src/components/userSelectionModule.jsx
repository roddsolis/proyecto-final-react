import { useState, useEffect, useContext } from 'react';
import { Context } from '../store/AppContext';

const UserSelectionModule = () => {
  const { store, actions } = useContext(Context);
  const [temas, setTemas] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedTema, setSelectedTema] = useState('');
  const [selectedMateria, setSelectedMateria] = useState('');

  useEffect(() => {
    // Obtener todas las áreas al cargar el componente
    fetch('http://127.0.0.1:8080/areas')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        actions.setAreas(data.areas);
      })
      .catch(error => console.error('Error fetching areas:', error));
  }, []);
  
  useEffect(() => {
    // Obtener temas cuando se selecciona un área
    if (selectedArea) {
      fetch(`http://127.0.0.1:8080/temas/${selectedArea}`)
        .then(response => response.json())
        .then(data => {
          console.log(data.temas);
          setTemas(data.temas);
        })
        .catch(error => console.error('Error fetching temas:', error));
    }
  }, [selectedArea]);

  useEffect(() => {
    // Obtener materias cuando se selecciona un tema
    if (selectedTema) {
      fetch(`http://127.0.0.1:8080/materias/${selectedTema}`)
        .then(response => response.json())
        .then(data => {
          console.log(data.materias);
          setMaterias(data.materias);
        })
        .catch(error => console.error('Error fetching materias:', error));
    }
  }, [selectedTema]);
  

  return (
    <>
      <div className="SelectionModuleWrapper">
        <div className="selectionModuleTextContainer">
          <h6 className='subtitle-sm'><div className="stepBadge">Paso 1</div>Configura tu búsqueda</h6>
          <p className='paragraph-m'>Para encontrar un tutor que se adapte de manera más precisa a tus necesidades, debes seleccionar una area, un tema y una materia específica.</p>
        </div>
        <form action="" className='selectorWrapper'>
          <select
            className="form-select"
            aria-label="Seleccionar área"
            value={selectedArea}
            onChange={(e) => {
              setSelectedArea(e.target.value); // Mantén el valor como cadena
              setSelectedTema(''); // Resetear el tema al cambiar el área
              setSelectedMateria(''); // Resetear la materia al cambiar el área
            }}
          >
            <option value="">Seleccionar área</option>
            {console.log('Areas:', store.areas)}
            {store.areas.map(area => (
              <option key={area.id} value={area.id.toString()}>{area.name}</option>
            ))}
          </select>

          <select
            className="form-select"
            aria-label="Seleccionar tema"
            value={selectedTema}
            onChange={(e) => {
              setSelectedTema(e.target.value);
              setSelectedMateria(''); // Resetear la materia al cambiar el tema
            }}
          >
            <option value="">Seleccionar tema</option>
            {temas.map(tema => (
              <option key={tema.id} value={tema.id.toString()}>{tema.name}</option>
            ))}
          </select>

          <select
            className="form-select"
            aria-label="Seleccionar materia"
            value={selectedMateria}
            onChange={(e) => setSelectedMateria(e.target.value)}
          >
            <option value="">Seleccionar materia específica</option>
            {materias.map(materia => (
              <option key={materia.id} value={materia.id.toString()}>{materia.name}</option>
            ))}
          </select>
        </form>
      </div>
    </>
  );
};

export default UserSelectionModule;

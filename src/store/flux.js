// getStore: obtiene todo lo que este dentro del store
// getActions: obtiene todo lo que este dentro del actions
// setStore : actualiza la informacion o estado.
const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      apiURL: 'http://127.0.0.1:8080/',
      usuarioAutenticado: null,
      areas: [], // Nuevo estado para almacenar las áreas
    },
    actions: {
      setUsuarioAutenticado: (usuario) => {
        setStore({ usuarioAutenticado: usuario });
      },
      setAreas: (areas) => {
        setStore({ areas: areas });
      },
    },
  };
};

export default getState;

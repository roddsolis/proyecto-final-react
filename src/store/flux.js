// getStore: obtiene todo lo que este dentro del store
// getActions: obtiene todo lo que este dentro del actions
// setStore : actualiza la informacion o estado.

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      apiURL: 'http://127.0.0.1:8080/',
      usuarioAutenticado: null, // Nuevo estado para almacenar los datos del usuario autenticado
    },
    actions: {
      setUsuarioAutenticado: (usuario) => {
        const store = getStore();
        setStore({ usuarioAutenticado: usuario });
      },
    },
  };
};

export default getState;


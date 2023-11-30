// getStore: obtiene todo lo que este dentro del store
// getActions: obtiene todo lo que este dentro del actions
// setStore : actualiza la informacion o estado.

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      apiURL: 'http://127.0.0.1:8080/',
      currentUser: {
        access_token: '123456',
        user: {
          nombre: 'rodrigo',
          apellido: 'solis',
          correo: 'rodrigo.solis.g@gmail.com',
        },
      },
    },
    actions: {
      obtenerAlumnos: async () => {
        try {
          const response = await fetch('http://127.0.0.1:8080/alumnos');
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      },
    },
    
  };
};

export default getState;


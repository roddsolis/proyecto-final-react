// getStore: obtiene todo lo que este dentro del store
// getActions: obtiene todo lo que este dentro del actions
// setStore : actualiza la informacion o estado.

const getState = ({ getStore, getActions, setStore }) => {

  return {
    store:{
        apiURL: 'http://127.0.0.1:5000/',
        currentUser: {
          'nombre': "",
          'apellido': ""
        }
    },

    actions:{

      crearCuenta: (e)=>{
        e.preventDefault()
        console.log('click')      
      }

    }
  }
}

export default getState

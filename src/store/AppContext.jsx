import { createContext, useState} from "react"
import getState from './flux'

export const Context = createContext(null)

const injectContext = PassedComponent => {

    const storeWrapper = props => {
      const [ state, setState ] = useState(getState({
        getState: () => null,
        getActions: () => null,
        getStore: () => null,
      }))
      
      return (

        <Context.Provider value={state}>
          <PassedComponent {...props}/>
        </Context.Provider>
        

      )

    }
    return storeWrapper
  }

 
export default injectContext
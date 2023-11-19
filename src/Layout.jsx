import  { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {useContext} from 'react'
import injectContext, { Context } from './store/AppContext'
import Start from './pages/Start'
import CreateAccount from './pages/CreateAccount'
import Login from './pages/Login'
import Home from './pages/Home'
import Room from './pages/Room'
import Notfound from './pages/Notfound'

const Layout = () => {

  const {store} = useContext(Context)


  console.log(store)

  return (
    <>
      <Router>
            <Routes>
              <Route path='/' element={<Start />}/>
              <Route path='/create-acount' element={ <CreateAccount/>} />
              <Route path='/login' element={ <Login/>}/>
              <Route path='/home' element={ <Home/>}/>
              <Route path='/room' element={ <Room/>}/>
              <Route path='*' element={ <Notfound/>}/>
            </Routes>
      </Router>
      
      
  
    </>
  )
}

export default injectContext(Layout)

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Start from './js/pages/Start'
import CreateAccount from './js/pages/CreateAccount'
import Login from './js/pages/Login'
import Home from './js/pages/Home'

const Layout = () => {
  return (
    <>

      <Router>
            <Routes>
              <Route path='/' element={<Start />}/>
              <Route path='/create-acount' element={ <CreateAccount/>}/>
              <Route path='/login' element={ <Login/>}/>
              <Route path='/home' element={ <Home/>}/>
            </Routes>
      </Router>
  
    </>
  )
}

export default Layout

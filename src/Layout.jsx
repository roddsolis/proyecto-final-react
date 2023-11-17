import  { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Start from './pages/Start'
import CreateAccount from './pages/CreateAccount'
import Login from './pages/Login'
import Home from './pages/Home'

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

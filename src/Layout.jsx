import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext, useEffect } from "react";
import injectContext, { Context } from "./store/AppContext";
import Start from "./pages/Start";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Room from "./pages/Room";
import Notfound from "./pages/Notfound";
import AdminLogin from "./pages/AdminLogin";
import AdminHome from "./pages/AdminHome";
import PayingMethod from "./pages/PayingMethod";
import TutorBankData from "./pages/tutorBankData";
import socketIO from "socket.io-client";

const WS = "http://localhost:8080";

const Layout = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    socketIO(WS);
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/create-account" element={<CreateAccount />} values={(store, actions)} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/payingmethod" element={<PayingMethod />} />
          <Route path="/tutorbankaccount" element={<TutorBankData />} />
          <Route path="/room" element={<Room />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
    </>
  );
};

export default injectContext(Layout);
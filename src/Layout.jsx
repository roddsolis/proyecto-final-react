import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext, useEffect } from "react";
import injectContext, { Context } from "./store/AppContext";
import socketIO from "socket.io-client";
import Start from "./pages/Start";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Room from "./pages/Room";
import Notfound from "./pages/Notfound";
import AdminLogin from "./pages/AdminLogin";
import AdminHome from "./pages/AdminHome";
import PayingMethod from "./pages/PayingMethod";
import TutorBankData from "./pages/TutorBankData";
import AlumnoView from "./pages/AlumnoView";
import TutorView from "./pages/TutorView";
import CambiarEstadoTutor from './pages/CambiarEstadoTutor';
import SolicitudEmparejamiento from './pages/SolicitudEmparejamiento';
import ConfirmarSolicitud from './pages/ConfirmarSolicitud';
import SolicitarFinalizacion from './pages/SolicitarFinalizacion';

const WS = "http://127.0.0.1:8080/";

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
          <Route path="/paymentmethod" element={<PayingMethod />} />
          <Route path="/paymentmethodTutor" element={<TutorBankData />} />
          <Route path="/room" element={<Room />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/alumnoview" element={<AlumnoView />} />
          <Route path="/tutorview" element={<TutorView />} />
          <Route path="/cambiar_estado_tutor" element={<CambiarEstadoTutor />} />
          <Route path="/solicitud_emparejamiento" element={<SolicitudEmparejamiento />} />
          <Route path="/confirmar_solicitud" element={<ConfirmarSolicitud />} />
          <Route path="/solicitar_finalizacion" element={<SolicitarFinalizacion />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
    </>
  );
};

export default injectContext(Layout);

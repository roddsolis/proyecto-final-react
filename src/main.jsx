import ReactDOM from "react-dom/client";
import Layout from "./Layout";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";

//GoogleOAuthProvider clientId es el token personal mio
ReactDOM.createRoot(document.querySelector("#root")).render(
  <GoogleOAuthProvider clientId="702683164186-ud9qnume08n073i34gk2obg013a6e51n.apps.googleusercontent.com">
    <Layout />
  </GoogleOAuthProvider>,
);

import CardProfile from "../components/CardProfile";
import Principal from "../components/Principal";
import { useContext } from "react";
import { Context } from "../store/AppContext";

const Home = () => {
  const { store, actions } = useContext(Context);
  console.log(store, actions);

  return (
    <>
      <div className="fluid d-flex" style={{ height: "100vh" }}>
        <div className="col-3 bg-light d-flex align-item-center justify-content-center p-4">
          <CardProfile />
        </div>
        <div className="col-9 p-5">
          <Principal />
        </div>
      </div>
    </>
  );
};

export default Home;

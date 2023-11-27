import "./../css/notFound.css";
const Notfound = () => {
  return (
    <>
      <div id="error-page">
        <div className="content">
          {/* CAMBIAR EL NUMERO DE ACUERDO AL ERROR */}
          <h2 className="header">404</h2>
          <h4 data-text="Ups! Pagina no encontrada">
            Ups! Pagina no encontrada
          </h4>
          <p>Disculpa, no sabemos que ha pasado.</p>
          <div className="btns p-2">
            <button type="button" className="btn btn-primary">
              Volver a Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notfound;

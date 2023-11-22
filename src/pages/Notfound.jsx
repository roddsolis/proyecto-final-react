const Notfound = () => {
  return (
    <>
      <div id="error-page">
        <div className="content">
          <h2 className="header" data-text="404">
            404
          </h2>
          <h4 data-text="Ups! Pagina no encontrada">
            Ups! Pagina no encontrada
          </h4>
          <p>
            Disculpa, la pagina que buscas no existe. Si ves un
            malfuncionamiento de algo, reporta el problema.
          </p>
          <div className="btns">
            <a href="#">volver a home</a>
            <a href="#">reportar problema</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notfound;

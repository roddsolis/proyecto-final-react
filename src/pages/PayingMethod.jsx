function PayingMethod() {
  return (
    <div className="container-fluid d-flex p-0 h-100">
      <div className="col-6 bg-primary d-flex align-items-center justify-content-center p-5">
        <div className="col">
          <h1 className="title-sm">Bienvenido a Lorem ipsum</h1>
          <p className="paragraph-l">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
            itaque accusantium odio, soluta, corrupti aliquam quibusdam tempora
            at cupiditate quis eum maiores libero veritatis? Dicta facilis sint
            aliquid ipsum atque?
          </p>
        </div>
      </div>
      <div className="col-6 d-flex align-items-center justify-content-center">
        <form action="" method="post" className="formWrapper">
          <h3 className="title-sm mb-5 text-center">Pago</h3>
          {/* Aquí puedes añadir los campos y elementos del formulario de pago */}
          <div className="my-3">
            <div className="form-check">
              <input
                id="credit"
                name="paymentMethod"
                type="radio"
                className="form-check-input"
                defaultChecked
                required
              />
              <label className="form-check-label" htmlFor="credit">
                Tarjeta de crédito
              </label>
            </div>
            <div className="form-check">
              <input
                id="debit"
                name="paymentMethod"
                type="radio"
                className="form-check-input"
                required
              />
              <label className="form-check-label" htmlFor="debit">
                Tarjeta de débito
              </label>
            </div>
            <div className="form-check">
              <input
                id="paypal"
                name="paymentMethod"
                type="radio"
                className="form-check-input"
                required
              />
              <label className="form-check-label" htmlFor="paypal">
                PayPal
              </label>
            </div>
          </div>
          <div className="row gy-3 mb-5">
            <div className="col-md-6">
              <label htmlFor="cc-name" className="form-label"></label>
              <input
                type="text"
                className="form-control"
                id="cc-name"
                placeholder="Nombre del titular"
                required
              />
              <div className="invalid-feedback">
                Se requiere el nombre en la tarjeta
              </div>
            </div>

            <div className="col-md-6">
              <label htmlFor="cc-number" className="form-label"></label>
              <input
                type="text"
                className="form-control"
                id="cc-number"
                placeholder=" Número de tarjeta"
                required
              />
              <div className="invalid-feedback">
                Se requiere número de tarjeta de crédito
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor="cc-expiration" className="form-label"></label>
              <input
                type="text"
                className="form-control"
                id="cc-expiration"
                placeholder="mm/aa"
                required
              />
              <div className="invalid-feedback">
                Fecha de vencimiento requerida
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor="cc-cvv" className="form-label"></label>
              <input
                type="text"
                className="form-control"
                id="cc-cvv"
                placeholder="cvv"
                required
              />
              <div className="invalid-feedback">
                Código de seguridad requerido
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <div className="row gy-3 mb-5 d-flex justify-content-between">
            <div className="col-md-6">
              <button className="w-100 btn btn-warning btn-m" type="submit">
                Pagar
              </button>
            </div>
            <div className="col-md-6">
              <button className="w-100 btn btn-danger btn-m" type="submit">
                Pagar después
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PayingMethod;

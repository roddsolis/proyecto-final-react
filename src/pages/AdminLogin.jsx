const AdminLogin = () => {
  return (
    <>
      <div id="adminlogin-container">
        <div className="adminlogin-leftside">
          <div className="adminlogin-textadmin">
            Admin
          </div>
        </div>
        <div className="adminlogin-rightside">
          <form method="post">
            <div>
              <label className="adminlogin-textcolor" htmlFor="usuario">Correo:</label>
            </div>
            <div>
              <input className="adminlogin-input" type="text" id="usuario" name="usuario" required />
            </div>
            <div>
              <label className="adminlogin-textcolor" htmlFor="contrasena">Contraseña:</label>
            </div>
            <div>
              <input className="adminlogin-input" type="password" id="contrasena" name="contrasena" required />
            </div>
            <div>
              <button className="adminlogin-button" type="submit">Iniciar sesión</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AdminLogin

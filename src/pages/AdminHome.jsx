const AdminHome = () => {
    return (
        <>
            <div id="adminhome-container">
                <div className="adminhome-header">
                    <div className="adminhome-subheader">
                        <h1 className="adminhome-title">Admin Panel</h1>
                        <div className="adminhome-correo">correo@correo.com</div>
                        <div className="adminhome-logout">Cerrar sesión</div>
                    </div>
                </div>
                <div className="adminhome-leftright">
                    <div className="adminhome-leftside">
                        <div className="adminhome-navbar">
                            <div className="adminhome-subnavbar">
                                <div className="adminhome-navlink1">
                                    <div className="">Tutores</div>
                                </div>
                                <div className="adminhome-navlink2">
                                    <div className="">Estudiantes</div>
                                </div>
                                <div className="adminhome-navlink2">
                                    <div className="">Categorías</div>
                                </div>
                                <div className="adminhome-navlink2">
                                    <div className="">Subcategorías</div>
                                </div>
                                <div className="adminhome-navlink2">
                                    <div className="">Contenidos</div>
                                </div>
                                <div className="adminhome-navlink2">
                                    <div className="">Imágenes</div>
                                </div>
                                <div className="adminhome-navlink3">
                                    <div className="">Soporte técnico</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="adminhome-rightside">
                        <div className="adminhome-borderright">
                            <h1>Título</h1>
                            <p>Párrafo</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeAdmin

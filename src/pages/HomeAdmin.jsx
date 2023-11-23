const HomeAdmin = () => {
    return (
        <>
            <div id="homeadmin-container">
                <div className="homeadmin-header">
                    <div className="homeadmin-subheader">
                        <h1 className="homeadmin-title">Admin Panel</h1>
                        <div className="homeadmin-correo">correo@correo.com</div>
                        <div className="homeadmin-logout">Cerrar sesión</div>
                    </div>
                </div>
                <div className="homeadmin-leftright">
                    <div className="homeadmin-leftside">
                        <div className="homeadmin-navbar">
                            <div className="homeadmin-subnavbar">
                                <div className="homeadmin-navlink1">
                                    <div className="">Tutores</div>
                                </div>
                                <div className="homeadmin-navlink2">
                                    <div className="">Estudiantes</div>
                                </div>
                                <div className="homeadmin-navlink2">
                                    <div className="">Categorías</div>
                                </div>
                                <div className="homeadmin-navlink2">
                                    <div className="">Subcategorías</div>
                                </div>
                                <div className="homeadmin-navlink2">
                                    <div className="">Contenidos</div>
                                </div>
                                <div className="homeadmin-navlink2">
                                    <div className="">Imágenes</div>
                                </div>
                                <div className="homeadmin-navlink3">
                                    <div className="">Soporte técnico</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="homeadmin-rightside">
                        <div className="homeadmin-borderright">
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

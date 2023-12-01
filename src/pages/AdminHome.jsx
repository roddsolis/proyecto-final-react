import { useState } from 'react';
import AdminTutores from '../components/AdminTutores';
import AdminEstudiantes from '../components/AdminEstudiantes';
import AdminCategorias from '../components/AdminCategorias';
import AdminContenido from '../components/AdminContenido';

const AdminHome = () => {
    const [contenidoDerecha, setContenidoDerecha] = useState(null);

    const handleClick = (opcion) => {
        // Configura el componente correcto según la opción seleccionada
        switch (opcion) {
            case 'Tutores':
                setContenidoDerecha(<AdminTutores />);
                break;
            case 'Estudiantes':
                setContenidoDerecha(<AdminEstudiantes />);
                break;
            case 'Categorias':
                setContenidoDerecha(<AdminCategorias />);
                break;
            case 'Contenidos':
                setContenidoDerecha(<AdminContenido />);
                break;
            default:
                setContenidoDerecha(null);
        }
    };

    return (
        <>
            <div id="adminhome-container">
                <div className="adminhome-header">
                    <div className="adminhome-subheader">
                        <div className="adminhome-title">Admin Panel</div>
                        <div className="adminhome-correo">correo@correo.com</div>
                        <div className="adminhome-logout">Cerrar sesión</div>
                    </div>
                </div>
                <div className="adminhome-leftright">
                    <div className="adminhome-leftside">
                        <div className="adminhome-navbar">
                            <div className="adminhome-subnavbar">
                                <div className="adminhome-navlink1" onClick={() => handleClick('Tutores')}>
                                    <div className="">Tutores</div>
                                </div>
                                <div className="adminhome-navlink2" onClick={() => handleClick('Estudiantes')}>
                                    <div className="">Estudiantes</div>
                                </div>
                                <div className="adminhome-navlink2" onClick={() => handleClick('Categorias')}>
                                    <div className="">Categorías</div>
                                </div>
                                <div className="adminhome-navlink3" onClick={() => handleClick('Contenidos')}>
                                    <div className="">Contenidos</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="adminhome-rightside">
                        <div className="adminhome-borderright">
                            {contenidoDerecha}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminHome

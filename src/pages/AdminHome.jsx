import React, { useState } from 'react';
import TutoresComponent from '../components/AdminComponent1';
import EstudiantesComponent from '../components/AdminComponent2';
import CategoriasComponent from '../components/AdminComponent3';
import SubcategoriasComponent from '../components/AdminComponent4';
import ContenidosComponent from '../components/AdminComponent5';
import ImagenesComponent from '../components/AdminComponent6';
import SoporteTecnicoComponent from '../components/AdminComponent7';

const AdminHome = () => {
    const [contenidoDerecha, setContenidoDerecha] = useState(null);

    const handleClick = (opcion) => {
        // Configura el componente correcto según la opción seleccionada
        switch (opcion) {
            case 'Tutores':
                setContenidoDerecha(<TutoresComponent />);
                break;
            case 'Estudiantes':
                setContenidoDerecha(<EstudiantesComponent />);
                break;
            case 'Categorias':
                setContenidoDerecha(<CategoriasComponent />);
                break;
            case 'Subcategorias':
                setContenidoDerecha(<SubcategoriasComponent />);
                break;
            case 'Contenidos':
                setContenidoDerecha(<ContenidosComponent />);
                break;
            case 'Imagenes':
                setContenidoDerecha(<ImagenesComponent />);
                break;
            case 'SoporteTecnico':
                setContenidoDerecha(<SoporteTecnicoComponent />);
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
                                <div className="adminhome-navlink2" onClick={() => handleClick('Subcategorias')}>
                                    <div className="">Subcategorías</div>
                                </div>
                                <div className="adminhome-navlink2" onClick={() => handleClick('Contenidos')}>
                                    <div className="">Contenidos</div>
                                </div>
                                <div className="adminhome-navlink2" onClick={() => handleClick('Imagenes')}>
                                    <div className="">Imágenes</div>
                                </div>
                                <div className="adminhome-navlink3" onClick={() => handleClick('SoporteTecnico')}>
                                    <div className="">Soporte técnico</div>
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

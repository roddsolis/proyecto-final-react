import Button from './Button' 

const CardProfile = () => {
    return (
        <>
            <div className="card-profile">
                <div className="card-profile-photo">
                    <img className="card-profile-photo-img" src="https://picsum.photos/80" />
                    <p className="card-profile-photo-change">Cambiar</p>
                </div>
                <div className="card-profile-userdata">
                    <div className="subtitle-sm">Valentina Plaza</div>
                    <div className="card-profile-userdata-mail">valeplaza@gmail.com</div>
                </div>
                <div className="card-profile-navbar">
                    <div className="card-profile-navbar-navlink1">
                        <div className="text-left">Cambiar contraseña</div>
                        <div className="text-right blue">Cambiar</div>
                    </div>
                    <div className="card-profile-navbar-navlink2">
                        <div className="text-left">Método de pago</div>
                        <Button btnText={'cambiar'} className={'btn-tertiary btn-m' }/>
                    </div>
                </div>
                <div className="card-profile-important text-left">
                    <p className="card-profile-important-text">
                        Para acceder a una sala y poder recibir una tutoría personalizada debes agregar un método de
                        pago
                        desde tu perfil.
                    </p>
                </div>
                <div className="card-profile-switchmode text-left">
                    <span className="card-profile-switchmode-title blue">¿Quieres hacer tutorías sobre algún tema que conoces?</span>
                    <br />
                    <br />
                    <p className="card-profile-switchmode-text">Puedes cambiar tu modalidad de cuenta a tutor y podrás recibir ganancias por tutoría.</p>
                    <br />
                    <div className="card-profile-switchmode-change text-right blue">Cambiar modalidad</div>
                </div>
                <div className="card-profile-logout">
                    Cerrar sesión
                </div>
            </div>
        </>
    )
}

export default CardProfile;
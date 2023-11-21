from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()



class Alumno(db.Model):
    __tablename__ = 'alumnos'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), nullable=False)
    apellidos = db.Column(db.String(120), nullable=False)
    correo_electronico = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(120), nullable=False, unique=True)
  

class Tutor(db.Model):
    __tablename__ = 'tutores'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), nullable=False)
    apellidos = db.Column(db.String(120), nullable=False)
    correo_electronico = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(120), nullable=False, unique=True)

class Perfil(db.Model):
    __tablename__ = 'perfiles'
    id = db.Column(db.Integer, primary_key=True)
    profile_img = db.Column(db.String(240), nullable=True)

class Materia(db.Model):
    __tablename__ = 'materias'
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String, nullable=False, unique=True)

class Solicitud_sala(db.Model):
    __tablename__ = 'Solicitud_salas'
    id = db.Column(db.Integer, primary_key=True)

class Sala(db.Model):
    __tablename__ = 'salas'
    id = db.Column(db.Integer, primary_key=True)

class Metodo_de_pago(db.Model):
    __tablename__ = 'metodos_de_pago'
    id = db.Column(db.Integer, primary_key=True)

class Cuenta_bancaria(db.Model):
    __tablename__ = 'cuentas_bancarias'
    id = db.Column(db.Integer, primary_key=True)
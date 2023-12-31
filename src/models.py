from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()



class Alumno(db.Model):
    __tablename__ = 'alumnos'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), nullable=False)
    apellidos = db.Column(db.String(120), nullable=False)
    correo_electronico = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(120), nullable=False, unique=True)
    tipo_de_cuenta = db.Column(db.Boolean, default=True, nullable=True)
    
    profile = db.relationship('Perfil', backref='alumno', uselist=False)
    datos_de_pago = db.relationship('Metodo_de_pago', backref='alumno', uselist=False )
    materia_seleccionada = db.relationship('Materia', backref='alumno', uselist=False )

class Tutor(db.Model):
    __tablename__ = 'tutores'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), nullable=False)
    apellidos = db.Column(db.String(120), nullable=False)
    correo_electronico = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(120), nullable=False, unique=True)
    tipo_de_cuenta = db.Column(db.Boolean, default=False, nullable=True)

    profile = db.relationship('Perfil', backref='tutor', uselist=False)
    datos_bancarios = db.relationship('Cuenta_bancaria', backref='tutor', uselist=False )
    materia_seleccionada = db.relationship('Materia', backref='tutor')


class Perfil(db.Model):
    __tablename__ = 'perfiles'
    id = db.Column(db.Integer, primary_key=True)
    profile_img = db.Column(db.String(240), nullable=True)
    alumno_id = db.Column(db.Integer, db.ForeignKey('alumnos.id'), nullable=False )
    tutor_id = db.Column(db.Integer, db.ForeignKey('tutores.id'), nullable=False )


class Materia(db.Model):
    __tablename__ = 'materias'
    id = db.Column(db.Integer, primary_key=True)
    nombre_materia = db.Column(db.String, nullable=False, unique=True)
    alumno_id = db.Column(db.Integer, db.ForeignKey('alumnos.id'), nullable=False )
    tutor_id = db.Column(db.Integer, db.ForeignKey('tutores.id'), nullable=False )

class Solicitud_sala(db.Model):
    __tablename__ = 'solicitud_sala'
    id = db.Column(db.Integer, primary_key=True)
    estado = db.Column(db.Boolean)
    alumno_id = db.Column(db.Integer, db.ForeignKey('alumnos.id'), nullable=False)
    tutor_id = db.Column(db.Integer, db.ForeignKey('tutores.id'), nullable=False)
  

class Sala(db.Model):
    __tablename__ = 'salas'
    id = db.Column(db.Integer, primary_key=True)
    solicitud_sala_id = db.Column(db.Integer, db.ForeignKey('solicitud_sala.id'), nullable=False)

    estado_sala = db.relationship('Solicitud_sala', backref='solicitud_sala', uselist=False) 

class Metodo_de_pago(db.Model):
    __tablename__ = 'metodos_de_pago'
    id = db.Column(db.Integer, primary_key=True)
    nombre_titular = db.Column(db.String, nullable=False)
    numero_tarjeta = db.Column(db.Integer, unique=True,nullable=False)
    fecha_vencimiento = db.Column(db.Integer,nullable=False)
    cvv = db.Column(db.Integer, unique=True,nullable=False)
    alumno_id = db.Column(db.Integer, db.ForeignKey('alumnos.id'), nullable=False )

class Cuenta_bancaria(db.Model):
    __tablename__ = 'cuentas_bancarias'
    id = db.Column(db.Integer, primary_key=True)
    tipo_de_cuenta = db.Column(db.Boolean, nullable=False)
    numero_cuenta = db.Column(db.Integer, nullable=False, unique=True)
    banco = db.Column(db.ARRAY(db.String))
    tutor_id = db.Column(db.Integer, db.ForeignKey('tutores.id'), nullable=False )
    

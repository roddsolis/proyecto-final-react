from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_socketio import SocketIO




db = SQLAlchemy()
socketio = SocketIO()

class Alumno(db.Model):
    __tablename__ = 'alumnos'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), nullable=False)
    apellidos = db.Column(db.String(120), nullable=False)
    correo_electronico = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(120), nullable=False)
    tipo_de_cuenta = db.Column(db.Boolean, default=True, nullable=False)
    conectado = db.Column(db.Boolean, default=False, nullable=False)
    estado = db.Column(db.Boolean, default=False, nullable=False)
    solicitud_saliente = db.Column(db.Boolean, default=False, nullable=False)
    alumno_en_sala = db.Column(db.Boolean, default=False, nullable=False)
    profile = db.relationship('Perfil', backref='alumno', uselist=False)
    datos_de_pago = db.relationship('Metodo_de_pago', backref='alumno', uselist=False )
    materia_seleccionada = db.relationship('Category', backref='alumno', uselist=False )

    def to_dict(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'apellidos': self.apellidos,
            'correo_electronico': self.correo_electronico,
            'password': self.password,
            'tipo_de_cuenta': self.tipo_de_cuenta,
            'alumno_en_sala': self.tipo_de_cuenta,
        }

class Tutor(db.Model):
    __tablename__ = 'tutores'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), nullable=False)
    apellidos = db.Column(db.String(120), nullable=False)
    correo_electronico = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(120), nullable=False)
    tipo_de_cuenta = db.Column(db.Boolean, default=False, nullable=False)
    conectado = db.Column(db.Boolean, default=False, nullable=False)
    estado = db.Column(db.Boolean, default=False, nullable=False)
    solicitud_entrante = db.Column(db.Boolean, default=False, nullable=False)
    tutor_en_sala = db.Column(db.Boolean, default=False, nullable=False)
    profile = db.relationship('Perfil', backref='tutor', uselist=False)
    datos_bancarios = db.relationship('Cuenta_bancaria', backref='tutor', uselist=False)
    materia_seleccionada = db.relationship('Category', backref='tutor', uselist=False)

    def to_dict(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'apellidos': self.apellidos,
            'correo_electronico': self.correo_electronico,
            'password': self.password,
            'tipo_de_cuenta': self.tipo_de_cuenta,
            'estado': self.estado,
            'solicitud_entrante': self.solicitud_entrante,
            'tutor_en_sala': self.tutor_en_sala,
        }   

class Perfil(db.Model):
    __tablename__ = 'perfiles'
    id = db.Column(db.Integer, primary_key=True)
    profile_img = db.Column(db.String(240), nullable=True)
    alumno_id = db.Column(db.Integer, db.ForeignKey('alumnos.id'), nullable=False )
    tutor_id = db.Column(db.Integer, db.ForeignKey('tutores.id'), nullable=False )

class Category(db.Model):
    __tablename__ = 'categorias'
    id = db.Column(db.Integer, primary_key=True)
    nombre_materia = db.Column(db.String, nullable=False, unique=True)
    alumno_id = db.Column(db.Integer, db.ForeignKey('alumnos.id'), nullable=False )
    tutor_id = db.Column(db.Integer, db.ForeignKey('tutores.id'), nullable=False )

class Solicitud_sala(db.Model):
    __tablename__ = 'solicitud_sala'
    id = db.Column(db.Integer, primary_key=True)
    confirmacion_tutor = db.Column(db.Boolean, default=None)
    estado = db.Column(db.Boolean, default=None)
    alumno_id = db.Column(db.Integer, db.ForeignKey('alumnos.id'), nullable=False)
    tutor_id = db.Column(db.Integer, db.ForeignKey('tutores.id'), nullable=False)
    def to_dict(self):
        return {
            'id': self.id,
            'confirmacion_tutor': self.confirmacion_tutor,
            'estado': self.estado,
            'alumno_id': self.alumno_id,
            'tutor_id': self.tutor_id,
        }

class Sala(db.Model):
    __tablename__ = 'salas'
    id = db.Column(db.Integer, primary_key=True)
    solicitud_sala_id = db.Column(db.Integer, db.ForeignKey('solicitud_sala.id'), nullable=False, unique=True)
    alumno_id = db.Column(db.Integer, db.ForeignKey('alumnos.id'), nullable=False)
    tutor_id = db.Column(db.Integer, db.ForeignKey('tutores.id'), nullable=False)
    estado_sala = db.Column(db.Boolean, default=True, nullable=False)
    finalizar_alumno = db.Column(db.Boolean, default=False, nullable=False)
    finalizar_tutor = db.Column(db.Boolean, default=False, nullable=False)

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

""" aca estaran las tablas que manejan los temas que puede seleccionar el alumno y que permiter hacer el match con un tutor en linea """

class Area(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)

    temas = db.relationship('Tema', backref='area', lazy=True)

class Tema(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    area_id = db.Column(db.Integer, db.ForeignKey('area.id'), nullable=False)

    materias = db.relationship('Materia', backref='tema', lazy=True)    

class Materia(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    tema_id = db.Column(db.Integer, db.ForeignKey('tema.id'), nullable=False)


class ChatBox(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_message = db.Column(db.String)
    message_time = db.Column(db.DateTime, default=datetime.utcnow)
    alumno_id = db.Column(db.Integer, db.ForeignKey('alumnos.id'))
    tutor_id = db.Column(db.Integer, db.ForeignKey('tutores.id'))
    
    def to_dict(self):
        message_data = {
            'id': self.id,
            'user_message': self.user_message,
            'message_time': self.message_time.strftime("%Y-%m-%d %H:%M:%S"),
            'alumno_id': self.alumno_id,
            'tutor_id': self.tutor_id,
        }

        # Emitir el mensaje a través de Socket.IO
        socketio.emit('new_message', message_data, namespace='/chat')
        return message_data
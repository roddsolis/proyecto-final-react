import os
from flask import Flask, jsonify, request
from dotenv import load_dotenv
from flask_migrate import Migrate
from flask_cors import CORS
from models import db, Alumno, Tutor, Solicitud_sala, Sala
from flask_socketio import SocketIO, emit, disconnect
from flask import render_template, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import SQLAlchemyError
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from sqlalchemy.sql import null



load_dotenv()

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['ENV'] = 'development'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASEURI')

# esta linea maneja el json web token
app.config['JWT_SECRET_KEY'] = os.getenv('SECRET_KEY')

socketio = SocketIO(app, cors_allowed_origins='*', transports=['websocket', 'polling'])

ultima_solicitud_dict = {}  # Variable global para almacenar la última solicitud en el servidor

db.init_app(app)
migrate = Migrate(app, db)
CORS(app)
jwt = JWTManager(app)

@app.route('/')
def main():
    return 'main'

@socketio.on('clientError')
def handle_client_error(e):
    print('Error en el cliente:', e)
    disconnect()

@app.route('/create-account', methods=['GET', 'POST'])
def getNewUser():
    if request.method == 'GET':
        return 'entrando con el metodo GET'
    if request.method == 'POST':
        try:
            name = request.json.get('nombre')
            lastname = request.json.get('apellido')
            email = request.json.get('correo')
            password = request.json.get('contraseña')
            opcion = request.json.get('opcion')

            nuevo_usuario = None
            print(opcion)
            if opcion == 'Quiero aprender':
                print(f"Datos recibidos: {name}, {lastname}, {email}, {password}, {opcion}")
                nuevo_usuario = Alumno(nombre=name, apellidos=lastname, correo_electronico=email, password=password)
            elif opcion == 'Quiero enseñar':
                print(f"Datos recibidos: {name}, {lastname}, {email}, {password}, {opcion}")
                nuevo_usuario = Tutor(nombre=name, apellidos=lastname, correo_electronico=email, password=password)
            else:
                return jsonify({'error': 'Opción no válida'})

            db.session.add(nuevo_usuario)
            db.session.commit()

            return jsonify({
                'name': name,
                'lastname': lastname,
                'email': email,
                'password': password,
                'opcion': opcion
            })

        except Exception as e:
            return jsonify({'error': str(e)})
        


# aca va la funcion que permite al usuario inciar sesion

@app.route('/login', methods=['POST'])
def login():
    return print("login")
# aca esta la funcion que maneja las rutas privadas

@app.route('/private', methods=['GET'])
def private():
    return print("ruta privada")
        

# Este es el enpoint que obtiene toda la lista de alumnos registrados

@app.route('/alumnos',methods=['GET'])
def obtener_alumnos():
    alumnos = Alumno.query.all()

    if not alumnos:
        return jsonify({'mensaje': 'No hay alumnos en la base de datos'})

    alumnos_json = [{'id': alumno.id, 'nombre': alumno.nombre, 'apellidos': alumno.apellidos,
                     'correo': alumno.correo_electronico, 'password': alumno.password, 'cuenta': alumno.tipo_de_cuenta}
                    for alumno in alumnos]
    
    print(alumnos_json)
    return jsonify(alumnos_json)


# Este es el enpoint que obtiene toda la lista de tutores registrados

@app.route('/tutores',methods=['GET'])
def obtener_turores():
    tutores = Tutor.query.all()

    if not tutores:
        return jsonify({'mensaje': 'No hay tutor en la base de datos'})

    tutor_json = [{'id': tutor.id, 'nombre': tutor.nombre, 'apellidos': tutor.apellidos,
                     'correo': tutor.correo_electronico, 'password': tutor.password, 'cuenta': tutor.tipo_de_cuenta}
                    for tutor in tutores]
    
    print(tutor_json)
    return jsonify(tutor_json)

@app.route('/estado_tutor/<int:tutor_id>', methods=['GET'])
def estado_tutor(tutor_id):
    tutor = Tutor.query.get(tutor_id)

    if tutor:
        return jsonify({'estado_tutor': tutor.estado})
    else:
        return jsonify({'error': 'Tutor no encontrado'}), 404

@app.route('/cambiar_estado_tutor', methods=['POST'])
def cambiar_estado_tutor():
    data = request.get_json()
    tutor_id = data.get('tutor_id')

    tutor = Tutor.query.get(tutor_id)

    try:
        if tutor:
            estado_anterior = tutor.estado  # Guarda el estado actual antes de cambiarlo
            tutor.estado = not tutor.estado  # Cambia el estado del tutor (True a False y viceversa)
            db.session.commit()

            mensaje = f'Estado del tutor cambiado exitosamente. Ahora está {"conectado" if tutor.estado else "desconectado"}'
            return jsonify({'message': mensaje})
        else:
            return jsonify({'message': 'Tutor no encontrado'}), 404

    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'message': f'Error al cambiar el estado del tutor: {str(e)}'}), 500

@app.route('/tutor_disponible', methods=['GET'])
def tutor_disponible():
    tutor_disponible = Tutor.query.filter_by(estado=True).first()

    if tutor_disponible:
        return jsonify({'tutor_disponible': True, 'tutor_id': tutor_disponible.id})
    else:
        return jsonify({'tutor_disponible': False})

@app.route('/solicitud_emparejamiento', methods=['POST'])
def solicitud_emparejamiento():
    data = request.get_json()
    alumno_id = data.get('alumno_id')

    # Buscar un tutor disponible con estado=True en la base de datos
    tutor_disponible = Tutor.query.filter_by(estado=True).first()

    try:
        if tutor_disponible:
            solicitud_sala = Solicitud_sala(
                confirmacion_alumno=False,
                confirmacion_tutor=False,
                estado=null(),  # Usar `null()` para representar el valor `None`
                alumno_id=alumno_id,
                tutor_id=tutor_disponible.id  # Asignar el ID del tutor disponible
            )
            db.session.add(solicitud_sala)
            tutor_disponible.estado = False
            db.session.commit()

            # Emitir un evento de solicitud de emparejamiento al tutor
            socketio.emit('solicitud_emparejamiento', {
                'alumno_id': alumno_id,
                'tutor_id': tutor_disponible.id,
                'solicitud_id': solicitud_sala.id
            }, room=f'tutor_{tutor_disponible.id}')

            return jsonify({'message': 'Solicitud de emparejamiento exitoso', 'solicitud_id': solicitud_sala.id})
        else:
            return jsonify({'message': 'Error en la solicitud de emparejamiento. No hay tutor disponible'}), 400

    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'message': f'Error en el emparejamiento: {str(e)}'}), 500
    
@app.route('/solicitudes_tutor', methods=['GET'])
def obtener_solicitudes_tutor():
    tutor_id = request.args.get('tutor_id')
    solicitudes = Solicitud_sala.query.filter_by(tutor_id=tutor_id, confirmacion_tutor=False).all()

    if not solicitudes:
        return jsonify({'mensaje': 'No hay nuevas solicitudes para el tutor'})

    solicitudes_json = [{'id': solicitud.id, 'alumno_id': solicitud.alumno_id, 'estado': solicitud.estado}
                        for solicitud in solicitudes]

    return jsonify(solicitudes_json)
    
@app.route('/confirmar_solicitud', methods=['POST'])
def confirmar_solicitud():
    data = request.get_json()

    solicitud_id = data.get('solicitud_id')
    tipo_usuario = data.get('tipo_usuario')  # Puede ser 'alumno' o 'tutor'

    # Validar que solicitud_id no sea una cadena vacía
    if not solicitud_id:
        return jsonify({'message': 'ID de solicitud no válido'}), 400

    solicitud = Solicitud_sala.query.filter_by(id=solicitud_id).first()

    if solicitud:
        if tipo_usuario == 'alumno':
            solicitud.confirmacion_alumno = True
        elif tipo_usuario == 'tutor':
            solicitud.confirmacion_tutor = True

        if solicitud.confirmacion_alumno and solicitud.confirmacion_tutor:
            solicitud.estado = True

            # Verificar si ambos han confirmado antes de generar la sala
            if solicitud.confirmacion_alumno and solicitud.confirmacion_tutor:
                try:
                    # Crear una nueva sala en la tabla Sala
                    nueva_sala = Sala(solicitud_sala_id=solicitud.id, alumno_id=solicitud.alumno_id, tutor_id=solicitud.tutor_id)
                    db.session.add(nueva_sala)
                    db.session.commit()

                    # Emitir un evento de actualización a través de WebSocket
                    socketio.emit('actualizar_solicitudes', {'message': 'Nueva solicitud confirmada'})

                    return jsonify({'message': 'Confirmación exitosa y sala generada'})
                
                except SQLAlchemyError as e:
                    db.session.rollback()
                    return jsonify({'message': f'Error al confirmar la solicitud y generar la sala: {str(e)}'}), 500

            return jsonify({'message': 'Solicitud de confirmación enviada'})
        else:
            try:
                db.session.commit()
                return jsonify({'message': 'Solicitud de confirmación enviada'})
            
            except SQLAlchemyError as e:
                db.session.rollback()
                return jsonify({'message': f'Error al enviar la solicitud de confirmación: {str(e)}'}), 500

    else:
        return jsonify({'message': 'Solicitud no encontrada'}), 404
    
@app.route('/rechazar_solicitud', methods=['POST'])
def rechazar_solicitud():
    data = request.get_json()
    solicitud_id = data.get('solicitud_id')

    if not solicitud_id:
        return jsonify({'message': 'ID de solicitud no válido'}), 400

    solicitud = Solicitud_sala.query.get(solicitud_id)

    try:
        if solicitud:
            # Cambiar el estado de la solicitud a 'rechazada'
            solicitud.estado = False  # Asegúrate de asignar un valor booleano aquí
            db.session.commit()

            # Obtener al tutor asociado a la solicitud y cambiar su estado a True (disponible)
            tutor = Tutor.query.get(solicitud.tutor_id)
            tutor.estado = True
            db.session.commit()

            mensaje = f'Solicitud rechazada exitosamente. Tutor disponible nuevamente.'
            return jsonify({'message': mensaje})
        else:
            return jsonify({'message': 'Solicitud no encontrada'}), 404

    except Exception as e:
        db.session.rollback()
        print(f'Error detallado: {str(e)}')  # Agregamos este registro para obtener más información
        return jsonify({'message': f'Error al rechazar la solicitud: {str(e)}'}), 500
    
@app.route('/verificar_confirmaciones', methods=['GET'])
def verificar_confirmaciones():
    solicitud_id = request.args.get('solicitud_id')
    solicitud = Solicitud_sala.query.get(solicitud_id)

    if solicitud:
        return jsonify({
            'tutor_confirmado': solicitud.confirmacion_tutor,
            'alumno_confirmado': solicitud.confirmacion_alumno
        })

    return jsonify({'error': 'Solicitud no encontrada'}), 404

# Endpoint para actualizar la solicitud de la sala
@app.route('/actualizar_solicitud_sala', methods=['POST'])
def actualizar_solicitud_sala():
    data = request.get_json()
    solicitud_id = data.get('solicitud_id')

    solicitud = Solicitud_sala.query.get(solicitud_id)

    if solicitud and solicitud.estado:
        # Crea una nueva sala mutua con un ID único
        nueva_sala = SalaMutua()
        
        try:
            db.session.add(nueva_sala)
            db.session.commit()

            return jsonify({'message': 'Solicitud de sala actualizada exitosamente'})

        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({'message': f'Error al actualizar la solicitud de sala: {str(e)}'}), 500

    return jsonify({'error': 'Solicitud no encontrada o no confirmada'}), 404
    
@app.route('/solicitar_finalizacion', methods=['POST'])
def solicitar_finalizacion():
    data = request.get_json()

    sala_id = data.get('sala_id')
    tipo_usuario = data.get('tipo_usuario')  # Puede ser 'alumno' o 'tutor'

    sala = Sala.query.get(sala_id)

    if sala:
        if tipo_usuario == 'alumno':
            sala.finalizar_alumno = True
        elif tipo_usuario == 'tutor':
            sala.finalizar_tutor = True

        # Verificar si ambas solicitudes de finalización están establecidas
        if sala.finalizar_alumno and sala.finalizar_tutor:
            sala.estado_sala = False

            try:
                # Confirmar la transacción
                db.session.commit()

                return jsonify({'message': 'Solicitud de finalización exitosa'})
            
            except SQLAlchemyError as e:
                # Si ocurre algún error, revertir la transacción
                db.session.rollback()
                return jsonify({'message': f'Error al procesar la solicitud de finalización: {str(e)}'}), 500

        else:
            try:
                # Confirmar la transacción
                db.session.commit()

                return jsonify({'message': 'Solicitud de finalización enviada'})
            
            except SQLAlchemyError as e:
                # Si ocurre algún error, revertir la transacción
                db.session.rollback()
                return jsonify({'message': f'Error al enviar la solicitud de finalización: {str(e)}'}), 500

    else:
        return jsonify({'message': 'Sala no encontrada'}), 404
    
@app.route('/obtener_ultima_solicitud_polling/<int:tutor_id>', methods=['GET'])
def obtener_ultima_solicitud_polling(tutor_id):
    try:
        ultima_solicitud = (
            db.session.query(Solicitud_sala)
            .filter_by(tutor_id=tutor_id)
            .order_by(Solicitud_sala.id.desc())
            .limit(1)
            .first()
        )

        if not ultima_solicitud:
            return jsonify({'error': 'No se encontraron solicitudes para el tutor.'}), 404

        print(f'ID de la última solicitud: {ultima_solicitud.id}')  # Agregar esta línea para depuración

        # Almacenar la última solicitud en el servidor
        ultima_solicitud_dict[tutor_id] = ultima_solicitud.to_dict()

        return jsonify({'ultimaSolicitud': ultima_solicitud.to_dict()})

    except Exception as e:
        print(f'Error en el servidor: {str(e)}')
        return jsonify({'error': f'Error al obtener la última solicitud_sala: {str(e)}'}), 500

    
""" Agregar host. Buscar que acepte conexiones con otro ip """
if __name__ == '__main__':
    socketio.run(app, debug=True, port=8080 )

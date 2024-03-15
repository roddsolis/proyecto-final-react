# Imports relacionados con el sistema y el entorno
import os
from dotenv import load_dotenv
import logging

# Imports relacionados con Flask
from flask import Flask, jsonify, request, render_template, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_socketio import SocketIO, emit, disconnect, join_room, leave_room
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required

# Imports relacionados con SQLAlchemy
from models import db, Alumno, Tutor, Solicitud_sala, Sala, Area, Tema, Materia, ChatBox
from sqlalchemy import and_, or_
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.sql import null
from sqlalchemy.orm.exc import NoResultFound

load_dotenv()

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['ENV'] = 'development'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASEURI')

# esta linea maneja el json web token
app.config['JWT_SECRET_KEY'] = os.getenv('SECRET_KEY')

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

socketio = SocketIO(app, cors_allowed_origins='*', transports=['websocket', 'polling'])

db.init_app(app)
CORS(app, resources={r"/*": {"origins": "*"}})
migrate = Migrate(app, db)
jwt = JWTManager(app)

@socketio.on('connect')
def handle_connect():
    print('Cliente conectado')

@socketio.on('disconnect')
def handle_disconnect():
    print('Cliente desconectado')

@app.route('/estado/<string:tipo>/<int:id>', methods=['GET'])
def obtener_estado(tipo, id):
    if tipo == 'tutor':
        usuario = Tutor.query.get(id)
        usuario_nombre = 'estado_tutor'
        solicitud_entrante = usuario.solicitud_entrante
    elif tipo == 'alumno':
        usuario = Alumno.query.get(id)
        usuario_nombre = 'estado_alumno'
        solicitud_saliente = usuario.solicitud_saliente
    else:
        return jsonify({'error': 'Tipo no válido'}), 400

    if usuario:
        if tipo == 'alumno':
            estado = usuario.estado
            alumno_en_sala = usuario.alumno_en_sala
            response = {
                usuario_nombre: {
                    'estado': estado,
                    'solicitud_saliente': solicitud_saliente,
                    'alumno_en_sala': alumno_en_sala,
                }
            }
        elif tipo == 'tutor':
            estado = usuario.estado
            tutor_en_sala = usuario.tutor_en_sala
            response = {
                usuario_nombre: {
                    'estado': estado,
                    'solicitud_entrante': solicitud_entrante,
                    'tutor_en_sala': tutor_en_sala,
                }
            }

        # Obtener la primera solicitud con estado=None asociada al usuario
        solicitud = Solicitud_sala.query.filter(
            (Solicitud_sala.alumno_id == id if tipo == 'alumno' else Solicitud_sala.tutor_id == id) &
            (Solicitud_sala.estado.is_(None))
        ).first()

        if solicitud:
            tutor = Tutor.query.get(solicitud.tutor_id) if tipo == 'alumno' else None
            alumno = Alumno.query.get(solicitud.alumno_id) if tipo == 'tutor' else None
            solicitud_info = {
                'id': solicitud.id,
                'confirmacion_tutor': solicitud.confirmacion_tutor,
                'tutor': tutor.to_dict() if tutor else None,
                'alumno': alumno.to_dict() if alumno else None,
            }
            response['solicitud_sala'] = solicitud_info

        return jsonify(response)
    else:
        return jsonify({'error': f'{tipo.capitalize()} no encontrado'}), 404


@socketio.on('actualizar_estado_alumno')
def actualizar_estado_alumno(usuario_id):
    try:
        estado_anterior = obtener_estados_usuario('alumno', usuario_id)
        print(f'Estado anterior del Alumno (ID: {usuario_id}): {estado_anterior}')

        # Obtener el estado específico del alumno
        estado_alumno_cambiado = obtener_estados_usuario('alumno', usuario_id)

        if estado_alumno_cambiado:
            mensaje = f'Estado del Alumno (ID: {usuario_id}) actualizado. Ahora está {"buscando" if estado_alumno_cambiado["estado"] else "desconectado"}.'
            
            # Emitir el evento a la sala del alumno
            socketio.emit('actualizar_estado_alumno', {'usuarios': [estado_alumno_cambiado]}, room=f'alumno_{usuario_id}')
            print(mensaje)
        else:
            print(f'Error: No se encontró el alumno con ID {usuario_id}')

    except Exception as e:
        print(f'Error en actualizar_estado_alumno: {str(e)}')


@socketio.on('actualizar_estado_tutor')
def actualizar_estado_tutor(usuario_id):
    try:
        estado_anterior = obtener_estados_usuario('tutor', usuario_id)
        print(f'Estado anterior del Tutor (ID: {usuario_id}): {estado_anterior}')

        # Obtener el estado específico del tutor
        estado_tutor_cambiado = obtener_estados_usuario('tutor', usuario_id)

        if estado_tutor_cambiado:
            mensaje = f'Estado del Tutor (ID: {usuario_id}) actualizado. Ahora está {"conectado" if estado_tutor_cambiado["estado"] else "desconectado"}.'
            
            # Emitir el evento a la sala del tutor
            socketio.emit('actualizar_estado_tutor', {'usuarios': [estado_tutor_cambiado]}, room=f'tutor_{usuario_id}')
            print(mensaje)
        else:
            print(f'Error: No se encontró el tutor con ID {usuario_id}')

    except Exception as e:
        print(f'Error en actualizar_estado_tutor: {str(e)}')

def obtener_estados_usuario(tipo_usuario, usuario_id):
    usuario = None
    if tipo_usuario == 'alumno':
        usuario = Alumno.query.get(usuario_id)
    elif tipo_usuario == 'tutor':
        usuario = Tutor.query.get(usuario_id)
    else:
        print(f'Error: Tipo de usuario no reconocido ({tipo_usuario})')
        return None

    if usuario:
        estado_usuario = {
            'usuario_id': usuario.id,
            'estado': usuario.estado,
        }

        if isinstance(usuario, Tutor):
            estado_usuario['solicitud_entrante'] = usuario.solicitud_entrante
            estado_usuario['tutor_en_sala'] = usuario.tutor_en_sala
        elif isinstance(usuario, Alumno):
            estado_usuario['solicitud_saliente'] = usuario.solicitud_saliente
            estado_usuario['alumno_en_sala'] = usuario.alumno_en_sala

        return estado_usuario
    else:
        print(f'Error: No se encontró el usuario con ID {usuario_id}')
        return None

def realizar_emparejamiento(alumno, tutor):
    try:
        # Crear una solicitud de sala
        print(f"Antes de emparejamiento - alumno.solicitud_saliente: {alumno.solicitud_saliente}")
        print(f"Antes de emparejamiento - tutor.solicitud_entrante: {tutor.solicitud_entrante}")
        alumno_id = alumno.id if isinstance(alumno, Alumno) else (tutor.id if isinstance(tutor, Alumno) else None)
        tutor_id = tutor.id if isinstance(tutor, Tutor) else (alumno.id if isinstance(alumno, Tutor) else None)

        solicitud_sala = Solicitud_sala(
            confirmacion_tutor=None,
            estado=None,
            alumno_id=alumno_id,
            tutor_id=tutor_id
        )

        # Agregar la solicitud de sala a la sesión de la base de datos
        db.session.add(solicitud_sala)

        # Confirmar los cambios en la base de datos
        db.session.commit()

        # Actualizar el estado de las banderas para indicar solicitudes entrantes
        alumno.estado = True
        alumno.solicitud_saliente = True
        alumno.alumno_en_sala = False
        tutor.estado = True
        tutor.solicitud_entrante = True
        tutor.tutor_en_sala = False
        db.session.commit()

        print(f"Después de emparejamiento - alumno.solicitud_saliente: {alumno.solicitud_saliente}")
        print(f"Después de emparejamiento - tutor.solicitud_entrante: {tutor.solicitud_entrante}")

        # Datos de la solicitud para emitir
        datos_solicitud = {
            'estado_sala': solicitud_sala.estado,
            'alumno_nombre': f"{alumno.nombre} {alumno.apellidos}",
            'tutor_nombre': f"{tutor.nombre} {tutor.apellidos}",
            'confirmacion_tutor': solicitud_sala.confirmacion_tutor,
        }

        # Emitir un evento con los datos de la solicitud de sala
        socketio.emit('actualizar_estado_tutor', datos_solicitud)
        socketio.emit('actualizar_estado_alumno', datos_solicitud)
        print('Emparejamiento realizado y socket emitidos')
        
        # Devolver una respuesta exitosa
        return True
    except SQLAlchemyError as e:
        # En caso de error, realizar un rollback y lanzar una excepción
        db.session.rollback()
        raise Exception(f'Error en el emparejamiento: {str(e)}')

@app.route('/verificar_y_emparejar', methods=['POST'])
def verificar_y_emparejar():
    try:
        data = request.get_json()
        tipo_usuario = data.get('tipo_usuario')
        usuario_id = data.get('usuario_id')

        print(f"Tipo de usuario: {tipo_usuario}, ID de usuario: {usuario_id}")  # Depuración

        if not tipo_usuario or not usuario_id:
            return jsonify({'error': 'Faltan datos necesarios'}), 400

        usuario_model = Alumno if tipo_usuario == 'alumno' else Tutor
        tipo_usuario_str = 'alumno' if tipo_usuario == 'alumno' else 'tutor'

        print(f"Modelo de usuario seleccionado: {usuario_model.__name__}")  # Depuración

        atributos = {
            'alumno': {
                'solicitud': 'solicitud_saliente',
                'en_sala': 'alumno_en_sala',
                'estado': 'estado'
            },
            'tutor': {
                'solicitud': 'solicitud_entrante',
                'en_sala': 'tutor_en_sala',
                'estado': 'estado'
            }
        }

        tipo_atributos = atributos.get(tipo_usuario)
        atributo_solicitud = tipo_atributos['solicitud']
        atributo_en_sala = tipo_atributos['en_sala']
        atributo_estado = tipo_atributos['estado']

        usuario_obj = usuario_model.query.get(usuario_id)
        if not usuario_obj:
            raise Exception(f'El {tipo_usuario_str} no existe.')

        # Verificar el estado del usuario
        if not getattr(usuario_obj, atributo_estado):
            return jsonify({'error': f'{tipo_usuario_str.capitalize()} no está habilitado'}), 400

        if getattr(usuario_obj, atributo_solicitud) or getattr(usuario_obj, atributo_en_sala):
            return jsonify({'error': f'{tipo_usuario_str.capitalize()} ya tiene una solicitud activa o está en una sala'}), 400

        solicitud_pendiente = Solicitud_sala.query.filter(
            and_(
                or_(Solicitud_sala.alumno_id == usuario_id, Solicitud_sala.tutor_id == usuario_id),
                Solicitud_sala.estado == None
            )
        ).first()

        if solicitud_pendiente:
            return jsonify({'error': f'{tipo_usuario_str.capitalize()} tiene una solicitud de sala pendiente'}), 400

        usuario_disponible_model = Tutor if tipo_usuario == 'alumno' else Alumno
        atributo_solicitud_disponible = 'solicitud_entrante' if tipo_usuario == 'alumno' else 'solicitud_saliente'
        atributo_en_sala_disponible = 'tutor_en_sala' if tipo_usuario == 'alumno' else 'alumno_en_sala'

        usuario_disponible = usuario_disponible_model.query.filter(
            and_(
                usuario_disponible_model.estado == True,
                getattr(usuario_disponible_model, atributo_solicitud_disponible) == False,
                getattr(usuario_disponible_model, atributo_en_sala_disponible) == False
            )
        ).first()

        print(f"Usuario disponible: {usuario_disponible}")  # Depuración

        if usuario_disponible:
            exito = realizar_emparejamiento(usuario_obj, usuario_disponible) if tipo_usuario == 'alumno' else realizar_emparejamiento(usuario_disponible, usuario_obj)
            
            print(f"Resultado del emparejamiento: {exito}")  # Depuración

            if exito:
                # Emitir eventos de Socket.IO con los datos de la solicitud a ambos usuarios
                evento = 'actualizar_estado_tutor' if tipo_usuario == 'tutor' else 'actualizar_estado_alumno'
                alumno_nombre = f"{usuario_obj.nombre} {usuario_obj.apellidos}" if tipo_usuario == 'alumno' else ''
                tutor_nombre = f"{usuario_obj.nombre} {usuario_obj.apellidos}" if tipo_usuario == 'tutor' else ''
                confirmacion_tutor = True if tipo_usuario == 'tutor' else False

                datos_solicitud = {
                    'estado_sala': usuario_obj.estado,
                    'alumno_nombre': alumno_nombre,
                    'tutor_nombre': tutor_nombre,
                    'confirmacion_tutor': confirmacion_tutor,
                }

                socketio.emit(evento, datos_solicitud, room=usuario_obj.id)
                socketio.emit(evento, datos_solicitud, room=usuario_disponible.id)
                
                return jsonify({'message': 'Emparejamiento exitoso'})
            else:
                return jsonify({'error': 'Error en el emparejamiento'})
        else:
            # Emitir el evento al mismo tipo de usuario y misma ID
            evento = f'actualizar_estado_{tipo_usuario_str}'
            alumno_nombre = f"{usuario_obj.nombre} {usuario_obj.apellidos}" if tipo_usuario == 'alumno' else ''
            tutor_nombre = f"{usuario_obj.nombre} {usuario_obj.apellidos}" if tipo_usuario == 'tutor' else ''
            confirmacion_tutor = True if tipo_usuario == 'tutor' else False

            datos_solicitud = {
                'estado_sala': None,
                'alumno_nombre': None,
                'tutor_nombre': None,
                'confirmacion_tutor': None,
            }

            socketio.emit(evento, datos_solicitud)
            
            return jsonify({'error': f'No hay usuarios disponibles para el {tipo_usuario_str}. {("Alumnos" if tipo_usuario_str == "tutor" else "Tutores")} no están disponibles en este momento.'})

    except Exception as e:
        print(f"Error interno: {e}")  # Registra el error para depuración
        return jsonify({'error': str(e)}), 500
    
@app.route('/cambiar_estado/alumno', methods=['POST'])
def cambiar_estado_alumno():
    try:
        data = request.get_json()
        alumno_id = data.get('alumno_id')

        # Buscar al alumno por su ID
        alumno = Alumno.query.get(alumno_id)

        if alumno:
            # Obtener el estado anterior del alumno
            estado_anterior = alumno.estado

            # Cambiar el estado del alumno (conectado/desconectado)
            alumno.estado = not alumno.estado

            try:
                # Buscar y actualizar la primera solicitud_sala pendiente del alumno a False
                if not alumno.estado:  # Si el alumno se desconecta
                    solicitud_pendiente = Solicitud_sala.query.filter_by(alumno_id=alumno.id, estado=None).first()
                    if solicitud_pendiente:
                        # Cambiar el estado de la solicitud_sala a False
                        solicitud_pendiente.estado = False
                        db.session.commit()

                        # Actualizar solicitudes_entrantes y solicitudes_salientes a False
                        tutor_id = solicitud_pendiente.tutor_id
                        solicitudes_entrantes = Solicitud_sala.query.filter_by(tutor_id=tutor_id, estado=None).all()
                        for solicitud in solicitudes_entrantes:
                            solicitud.estado = False

                        # Actualizar la columna solicitud_saliente del alumno a False
                        alumno.solicitud_saliente = False
                        db.session.commit()

                        # Actualizar la columna solicitud_entrante del tutor a False
                        tutor = Tutor.query.get(tutor_id)
                        if tutor:
                            tutor.solicitud_entrante = False
                            db.session.commit()
                            # Emitir un evento de socket para actualizar el estado del tutor en tiempo real
                            print('Enviando evento actualizar_estado_alumno:', alumno_id)
                            socketio.emit('actualizar_estado_alumno', alumno_id)
                            socketio.emit('actualizar_estado_tutor', tutor_id)

                # Confirmar los cambios en la base de datos
                db.session.commit()

                # Si el estado anterior era False y el nuevo estado es True, llamar a verificar_y_emparejar
                # if not estado_anterior and alumno.estado:
                    # verificar_y_emparejar('alumno', alumno_id)

                # Crear un mensaje con el nuevo estado del alumno
                mensaje = f'Estado del alumno cambiado exitosamente. Ahora está {"buscando" if alumno.estado else "desconectado"}'

                # Devolver una respuesta JSON con el mensaje y el estado actualizado del alumno
                return jsonify({'message': mensaje, 'estado': alumno.estado})

            except SQLAlchemyError as e:
                # En caso de un error en la transacción con la base de datos, realizar un rollback
                db.session.rollback()
                print(f'Error detallado al cambiar el estado del alumno: {str(e)}')
                return jsonify({'message': f'Error al cambiar el estado del alumno: {str(e)}'}), 500

        # Si no se encuentra al alumno, devolver un mensaje de error
        return jsonify({'message': 'Alumno no encontrado'}), 404

    except Exception as e:
        # En caso de un error general, imprimir el error y devolver un mensaje de error
        print(f'Error general al cambiar el estado del alumno: {str(e)}')
        return jsonify({'message': f'Error general al cambiar el estado del alumno: {str(e)}'}), 500

@app.route('/cambiar_estado/tutor', methods=['POST'])
def cambiar_estado_tutor():
    try:
        data = request.get_json()
        tutor_id = data.get('tutor_id')

        # Buscar al tutor por su ID
        tutor = Tutor.query.get(tutor_id)

        if tutor:
            # Obtener el estado anterior del tutor
            estado_anterior = tutor.estado

            # Cambiar el estado del tutor (conectado/desconectado)
            tutor.estado = not tutor.estado

            try:
                # Buscar y actualizar la primera solicitud_sala pendiente del tutor a False
                if not tutor.estado:  # Si el tutor se desconecta
                    solicitud_pendiente = Solicitud_sala.query.filter_by(tutor_id=tutor.id, estado=None).first()
                    if solicitud_pendiente:
                        # Cambiar el estado de la solicitud_sala a False
                        solicitud_pendiente.estado = False
                        db.session.commit()

                        # Actualizar solicitudes_entrantes y solicitudes_salientes a False
                        alumno_id = solicitud_pendiente.alumno_id
                        solicitudes_entrantes = Solicitud_sala.query.filter_by(alumno_id=alumno_id, estado=None).all()
                        for solicitud in solicitudes_entrantes:
                            solicitud.estado = False

                        # Actualizar la columna solicitud_entrante del tutor a False
                        tutor.solicitud_entrante = False
                        db.session.commit()

                        # Actualizar la columna solicitud_saliente del alumno a False
                        alumno = Alumno.query.get(alumno_id)
                        if alumno:
                            alumno.solicitud_saliente = False
                            db.session.commit()
                            # Emitir un evento de socket para actualizar el estado del alumno en tiempo real
                            print('Enviando evento actualizar_estado_tutor:', tutor_id)
                            socketio.emit('actualizar_estado_tutor', tutor_id)
                            socketio.emit('actualizar_estado_alumno', alumno_id)


                # Confirmar los cambios en la base de datos
                db.session.commit()

                # Si el estado anterior era False y el nuevo estado es True, llamar a verificar_y_emparejar
                # if not estado_anterior and tutor.estado:
                    # verificar_y_emparejar('tutor', tutor_id)

                # Crear un mensaje con el nuevo estado del tutor
                mensaje = f'Estado del tutor cambiado exitosamente. Ahora está {"conectado" if tutor.estado else "desconectado"}'

                # Devolver una respuesta JSON con el mensaje y el estado actualizado del tutor
                return jsonify({'message': mensaje, 'estado': tutor.estado})

            except SQLAlchemyError as e:
                # En caso de un error en la transacción con la base de datos, realizar un rollback
                db.session.rollback()
                print(f'Error detallado al cambiar el estado del tutor: {str(e)}')
                return jsonify({'message': f'Error al cambiar el estado del tutor: {str(e)}'}), 500

        # Si no se encuentra al tutor, devolver un mensaje de error
        return jsonify({'message': 'Tutor no encontrado'}), 404

    except Exception as e:
        # En caso de un error general, imprimir el error y devolver un mensaje de error
        print(f'Error general al cambiar el estado del tutor: {str(e)}')
        return jsonify({'message': f'Error general al cambiar el estado del tutor: {str(e)}'}), 500
    
@app.route('/procesar_solicitud_sala/<int:tutor_id>', methods=['POST'])
def procesar_solicitud_sala(tutor_id):
    try:
        solicitud = Solicitud_sala.query.filter_by(tutor_id=tutor_id, estado=None).first()

        if solicitud:
            if request.json.get('aceptar'):
                # Aceptar la solicitud
                solicitud.estado = True
                solicitud.confirmacion_tutor = True
                db.session.commit()

                # Crear la sala
                nueva_sala = Sala(
                    solicitud_sala_id=solicitud.id,
                    alumno_id=solicitud.alumno_id,
                    tutor_id=solicitud.tutor_id,
                    estado_sala=True
                )
                db.session.add(nueva_sala)
                db.session.commit()

                # Actualizar el estado del tutor y el alumno
                tutor = Tutor.query.get(tutor_id)
                alumno = Alumno.query.get(solicitud.alumno_id)
                tutor.estado = False
                tutor.solicitud_entrante = False
                tutor.tutor_en_sala = True
                alumno.estado = False
                alumno.solicitud_saliente = False
                alumno.alumno_en_sala = True
                db.session.commit()

                # Emitir eventos de Socket.IO con los datos de la solicitud
                datos_solicitud = {
                    'estado_sala': solicitud.estado,
                    'alumno_nombre': f"{alumno.nombre} {alumno.apellidos}",
                    'tutor_nombre': f"{tutor.nombre} {tutor.apellidos}",
                    'confirmacion_tutor': True,
                }

                socketio.emit('actualizar_estado_tutor', datos_solicitud)
                socketio.emit('actualizar_estado_alumno', datos_solicitud)

                return jsonify({'message': 'Solicitud de sala aceptada y sala creada correctamente'}), 200
            else:
                # Rechazar la solicitud
                solicitud.estado = False
                solicitud.confirmacion_tutor = False
                db.session.commit()

                # Actualizar el estado del tutor y el alumno al rechazar
                tutor = Tutor.query.get(tutor_id)
                alumno = Alumno.query.get(solicitud.alumno_id)
                tutor.estado = False
                tutor.solicitud_entrante = False
                tutor.tutor_en_sala = False
                alumno.estado = True
                alumno.solicitud_saliente = False
                alumno.alumno_en_sala = False
                db.session.commit()

                # Emitir eventos de Socket.IO con los datos de la solicitud rechazada
                datos_solicitud = {
                    'estado_sala': solicitud.estado,
                    'alumno_nombre': None,
                    'tutor_nombre': None,
                    'confirmacion_tutor': False,
                }

                socketio.emit('actualizar_estado_tutor', datos_solicitud)
                socketio.emit('actualizar_estado_alumno', datos_solicitud)

                return jsonify({'message': 'Solicitud de sala rechazada correctamente'}), 200
        else:
            return jsonify({'message': 'No se encontraron solicitudes pendientes para procesar'}), 404

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Ocurrió un error al procesar la solicitud'}), 500

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

# Endpoint para obtener todas las áreas
@app.route('/areas', methods=['GET'])
def obtener_areas():
    try:
        areas = Area.query.all()
        areas_data = [{'id': area.id, 'name': area.name} for area in areas]
        print('Áreas:', areas_data)
        return jsonify({'areas': areas_data})
    except Exception as e:
        print(f'Error al obtener áreas: {e}')
        return jsonify({'error': 'Error al obtener áreas'}), 500

# Endpoint para obtener temas dado un ID de área
@app.route('/temas/<int:area_id>', methods=['GET'])
def obtener_temas(area_id):
    area = Area.query.get(area_id)
    if area:
        temas = Tema.query.filter_by(area_id=area_id).all()
        temas_data = [{'id': tema.id, 'name': tema.name} for tema in temas]
        return jsonify({'temas': temas_data})
    else:
        return jsonify({'error': 'Área no encontrada'}), 404

# Endpoint para obtener materias dado un ID de tema
@app.route('/materias/<int:tema_id>', methods=['GET'])
def obtener_materias(tema_id):
    tema = Tema.query.get(tema_id)
    if tema:
        materias = Materia.query.filter_by(tema_id=tema_id).all()
        materias_data = [{'id': materia.id, 'name': materia.name} for materia in materias]
        return jsonify({'materias': materias_data})
    else:
        return jsonify({'error': 'Tema no encontrado'}), 404
    



# aca se manejan los mensajes del chatbox que se realizan en la sala

@socketio.on('usuario_autenticado', namespace='/chat')
def handle_usuario_autenticado(usuario_data):
    print('Usuario autenticado:', usuario_data)


@socketio.on('new_message', namespace='/chat')
def handle_new_message(message_data):
    try:
        new_message = ChatBox(
            user_message=message_data['user_message'],
            alumno_id=message_data['alumno_id'],
            tutor_id=message_data['tutor_id']
        )
        db.session.add(new_message)
        db.session.commit()
    except Exception as e:
        print(f"Error al guardar el mensaje en la base de datos: {str(e)}")

    emit('new_message', message_data, namespace='/chat')


#activar o descativar camara    
@socketio.on('toggle_camera', namespace='/chat')
def handle_toggle_camera(data):
    emit('camera_toggled', data, broadcast=True)


    
if __name__ == '__main__':
    socketio.run(app, debug=True, port=8080 )

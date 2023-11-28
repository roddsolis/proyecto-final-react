import os
from flask import Flask, jsonify, request
from dotenv import load_dotenv
from flask_migrate import Migrate
from flask_cors import CORS
from models import db, Alumno, Tutor
from flask_socketio import SocketIO, emit
from flask import render_template, send_from_directory

load_dotenv()

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['ENV'] = 'development'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASEURI')
socketio = SocketIO(app, cors_allowed_origins='*')

db.init_app(app)
migrate = Migrate(app, db)
CORS(app)

@app.route('/')
def main():
    return 'hola desde el main'

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
            opcion = request.json.get('opcion')  # Nueva línea para obtener la opción (enseñar o aprender)

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

if __name__ == '__main__':
    socketio.run(app, port=8080)

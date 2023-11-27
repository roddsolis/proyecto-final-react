import os
from flask import Flask
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_migrate import Migrate
from flask_cors import CORS
from models import db 
from flask_socketio import SocketIO, emit
from flask import Flask, render_template, send_from_directory



load_dotenv()

app = Flask(__name__)
app.config['DEBUG'] = True,
app.config['ENV'] = 'development'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] =False
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASEURI')
socketio = SocketIO(app, cors_allowed_origins='*')

db.init_app(app)
migrate = Migrate(app, db)
CORS(app)

#Aca se agregan los endpoints de la base de datos

""" @app.route('/')
def main():
    return 'main'

@app.route('/create-acount', methods=['GET', 'POST'])
def getNewUser():

    if request.method == 'POST':
        name = request.form['nombre']
        lastname = request.form['apellido']
        email = request.form['correo']
        password = request.form['constraseña']

        print(name,lastname,email,password)

    return 'hola' """


@app.route('/room')
def room():
    # Puedes ajustar la ruta según tu estructura de archivos
    return send_from_directory('pages', './pages/Room.jsx')

@socketio.on('connect')
def handle_connect():
    print('Usuario conectado')

@socketio.on('disconnect')
def handle_disconnect():
    print('Usuario desconectado')
    

if __name__ == '__main__':
    app.run()
    socketio.run(app, port=8080)
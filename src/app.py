import os
from flask import Flask
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_migrate import Migrate
from flask_cors import CORS
from models import db 

load_dotenv()

app = Flask(__name__)
app.config['DEBUG'] = True,
app.config['ENV'] = 'development'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] =False
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASEURI')

db.init_app(app)
migrate = Migrate(app, db)
CORS(app)

#Aca se agregan los endpoints de la base de datos

@app.route('/')
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

    return 'hola'
    

if __name__ == '__main__':
    app.run()
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_migrate import Migrate
from flask_cors import CORS
from models import db 
import os


load_dotenv()

app = Flask(__name__)
db.init_app(app)
Migrate(app, db)
app.config['DEBUG'] = True,
app.config['ENV'] = 'development'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] =False
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASEURI')


@app.route('/', methods=['GET','POST', 'PUT', 'DELETE'])
def main():
    data = {
        "status": "server up"
    }

    return jsonify(data), 200



if __name__ == '__main__':
    app.run()
import os
from flask import Flask, jsonify, request
from flask_migrate import Migrate
from flask_cors import CORS
from dotenv import load_dotenv
from models import db 


load_dotenv()

app = Flask(__name__)
app.config['DEBUG'] = True,
app.config['ENV'] = 'development'
app.config['SQLALCHEMY_TRACK_MODIFICACTIONS'] =False
app.config['SQLALCHEMY_DATABASEURI'] = os.getenv('DATABASEURI')

db.init_app(app)
Migrate(app, db)

@app.route('/', methods=['GET','POST', 'PUT', 'DELETE'])
def main():
    data = {
        "status": "server up"
    }

    return jsonify(data), 200



if __name__ == '__main__':
    app.run(debug=True)
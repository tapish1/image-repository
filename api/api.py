import time
from flask import Flask
from flask import request
import firebase_admin
from firebase_admin import credentials
from firebase_admin import auth

cred = credentials.Certificate('credentials.json')
firebase_admin.initialize_app(cred)
app = Flask(__name__)

current_user = None

@app.route('/add', methods=['POST'])
def add_user():
    data = request.json
    try:
        user = auth.create_user(email=data['email'], password=data['password'])
        return {'userAdded': True}
    except:
        return {'userAdded': False}
    return {'userAdded': True}

@app.route('/user_logged_in', methods=['POST'])
def get_user():
    data = request.json
    current_user = data['user']
    return current_user

@app.route('/current_user')
def return_user():
    return {'user': current_user}

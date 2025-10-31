from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Izinkan CORS untuk frontend
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET', 'your-secret-key')
app.config['JWT_TOKEN_LOCATION'] = ['headers']
jwt = JWTManager(app)

# Dummy data
projects = [
    {"id": 1, "title": "Portfolio Web", "description": "Website ini menggunakan React dan Flask.", "image": "http://placehold.it/400x200/FFBBE1/000000?text=Portfolio+Web", "languages": ["React", "Flask", "TypeScript"]},
    {"id": 2, "title": "API Tester", "description": "Tool untuk testing APIs.", "image": "http://placehold.it/400x200/764ba2/FFFFFF?text=API+Tester", "languages": ["Python", "Flask"]},
    {"id": 3, "title": "E-commerce Platform", "description": "Platform e-commerce dengan fitur keranjang belanja dan pembayaran.", "image": "http://placehold.it/400x200/667eea/FFFFFF?text=E-commerce+Platform", "languages": ["React", "Node.js", "MongoDB"]},
    {"id": 4, "title": "Task Management App", "description": "Aplikasi manajemen tugas dengan fitur kolaborasi tim.", "image": "http://placehold.it/400x200/f093fb/000000?text=Task+Management+App", "languages": ["Vue.js", "Express", "PostgreSQL"]},
    {"id": 5, "title": "Weather Dashboard", "description": "Dashboard cuaca real-time dengan integrasi API eksternal.", "image": "http://placehold.it/400x200/f5576c/FFFFFF?text=Weather+Dashboard", "languages": ["JavaScript", "HTML", "CSS"]}
]

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if username == 'admin' and password == 'password':  # Dummy auth
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200
    return jsonify({"msg": "Bad username or password"}), 401

@app.route('/projects', methods=['GET'])
@jwt_required()
def get_projects():
    return jsonify(projects), 200

@app.route('/public-projects', methods=['GET'])
def get_public_projects():
    # Return all projects as public for slider
    return jsonify(projects), 200

if __name__ == '__main__':
    app.run(debug=True)
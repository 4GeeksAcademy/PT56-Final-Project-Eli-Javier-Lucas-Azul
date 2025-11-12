"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from Backend.utils import APIException, generate_sitemap
from Backend.models import db, User
from Backend.routes import api
from Backend.admin import setup_admin
from Backend.commands import setup_commands
from flask_jwt_extended import create_access_token

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../dist/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


#########################
# API DOCUMENTATION     #
# User creation         #
# Method: POST          #
# email, password, name #
#########################

# SIGNUP > Registro
@app.route("/api/login", methods=["POST"])
def signup():
    data = request.get_json() or {}
    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "").strip()

    # Validacion de todos los campos #
    if not name or not email or not password:
        return jsonify({"Mensaje": "Todos los campos son obligatorios!"}), 400
    # Validacion de longitud de password #
    if len(password) < 12:
        return jsonify({"Mensaje": "La contraseña debe tener minimo 12 caracteres."}), 400
    # Verificacion de que no exista el mail #
    if User.query.filter_by(email=email).first():
        return jsonify({"Mensaje": "El email ya fue registrado"}), 400

    # Creacion de usuario #
    NewUser = User(name=name, email=email)
    NewUser.set_password(password)
    db.session.add(NewUser)
    db.session.commit()
    return jsonify({"Mensaje": "El usuario se ha creado correctamente", "user": NewUser.serialize()}), 201

# Login > Acceso


@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()
    password = data.get("password", "").strip()

    # Validacion de todos los campos #
    if not email or not password:
        return jsonify({"Mensaje": "Se requiere email y contraseña"}), 400
    # Verificacion de que no exista el mail #

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"Mensaje": "Credenciales invalidas"}), 401

    access_token = create_access_token(identity=str(user.id))
    return jsonify({
        "Mensaje": "Login Exitoso",
        "token": access_token,
        "user": user.serialize()
    }), 200


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)

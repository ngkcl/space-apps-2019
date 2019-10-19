from flask import Flask, jsonify, request
from flask_jwt import JWT, jwt_required, current_identity

from playhouse.shortcuts import model_to_dict, dict_to_model

from temperature.cmip5_utility import CMIP5
from users.user import User, DataPoint
from flasgger import Swagger

cmip5 = CMIP5()

def authenticate(username, password):
    user = User.get(User.username == username)
    if user and user.password.encode('utf-8') == password.encode('utf-8'):
        return user

def identity(payload):
    user_id = payload['identity']
    return User.get_by_id(user_id)

app = Flask(__name__)
swagger = Swagger(app)
app.debug = True
app.config['SECRET_KEY'] = 'super-duper-secret'
app.config['JWT_AUTH_HEADER_PREFIX'] = "Bearer"

jwt = JWT(app, authenticate, identity)

@app.route('/')
def index():
    return ""

@app.route('/data/<emission>/')
@app.route('/data/<emission>/<int:year>')
def emission(emission, year = 2200):
    step = 25
    return jsonify({'lables': cmip5.worstCase(year, step=step)[0], 'datasets': [ 
        { 'color': 'red', 'data': cmip5.worstCase(year, step=step)[1] }, 
        { 'color': 'green', 'data': cmip5.bestCase(year, step=step)[1] },
        { 'color': '#AAA', 'data': cmip5.extrapolateDeltaT(float(emission), year, step=step)[1] }
    ]})

@app.route('/data/<country>/')
@app.route('/data/<country>/<int:year>')
def country(country, year = 2200):
    return jsonify({'worst': cmip5.worstCase(year), 'best': cmip5.bestCase(year), 'est': cmip5.nationDeltaT(country, year) })


@app.route('/user/register', methods=['POST'])
def register():
    """
    Register yourself
    ---
    consumes:
      - application/json
    produces:
      - application/json
    parameters:
      - in: body
        name: body
        description: JSON parameters.
        schema:
            type: object
            properties:
                username:
                    type: string
                password:
                    type: string
    responses:
        200:
            content:
                schema:
                    type: string
    """
    user = request.json
    return jsonify(
        User.create(username=user['username'], password=user['password'], food_emissions=0).id
    )


@app.route("/login", methods=["POST"])
def login():
    """
    User authenticate method.
    ---
    description: Authenticate user with supplied credentials.
    parameters:
      - name: username
        in: formData
        type: string
        required: true
      - name: password
        in: formData
        type: string
        required: true
    responses:
      200:
        description: User successfully logged in.
      400:
        description: User login failed.
    """
    # try:
    username = request.form.get("username")
    password = request.form.get("password")

    user = authenticate(username, password)
    if not user:
        raise Exception("User not found!")

    resp = jsonify({"message": "User authenticated"})
    resp.status_code = 200

    access_token = jwt.jwt_encode_callback(user)

    # add token to response headers - so SwaggerUI can use it
    resp.headers.extend({'jwt-token': access_token})

    # except Exception as e:
    #     print(e)
    #     resp = jsonify({"message": "Bad username and/or password"})
    #     resp.status_code = 401

    return resp

@app.route('/user')
@jwt_required()
def user():
    """
    Check user.
    ---
    description: Check user.
    responses:
      200:
        description: User successfully logged in.
      400:
        description: User not logged in.
    """
    return jsonify(model_to_dict(current_identity))

if __name__ == '__main__':
    app.run()
from flask import Flask, jsonify, request
from flask_jwt import JWT, jwt_required, current_identity
from flasgger import Swagger

from collections import namedtuple

from peewee import *
from playhouse.sqlite_ext import *
from playhouse.shortcuts import model_to_dict, dict_to_model
from datetime import date, timedelta

from temperature.cmip5_utility import CMIP5
from co2.food_test import FoodEmission
from users.user import User, DataPoint
from VehicleCalculator import VehicleCalculator
# from 

cmip5 = CMIP5()
fem = FoodEmission()


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


@app.route('/data/time/<temperature>')
@jwt_required()
def time(temperature):
    """

    """
    temperature = float(temperature)
    emissions = fem.foodAverage(
        current_identity.id) + VehicleCalculator.vehicleAvg(current_identity.id) + 8.44
    return str( cmip5.invTrace(emissions, temperature) )


@app.route('/data/temperature/')
@app.route('/data/temperature/<int:year>')
@jwt_required()
def emission(year=2200):
    step = 25
    user_id = current_identity.id
    
    return jsonify({'lables': cmip5.worstCase(year, step=step)[0], 'datasets': [
        {'color': 'red', 'data': cmip5.worstCase(year, step=step)[1]},
        {'color': 'green', 'data': cmip5.bestCase(year, step=step)[1]},
        {'color': '#AAA', 'data': cmip5.extrapolateOwnDeltaT(float(VehicleCalculator.vehicleAvg(
            user_id)) + float(fem.foodAverage(user_id)), year, step=step)[1]}
    ]})


@app.route('/data/vehicle/<distance>/<time>')
def vehicleArray(distance, time):
    return jsonify({'vehicleArray': VehicleCalculator.vehicleCalc(float(distance), float(time))})


@app.route('/data/polution/<vehicle>/<distance>')
def polutionOut(vehicle, distance):
    return jsonify({'carbonDioxideGrams': VehicleCalculator.polutionCalc(vehicle, float(distance))})


@app.route('/user/register', methods=['POST'])
def register():
    user = request.json
    return jsonify(
        User.create(username=user['username'], password=user['password']).id
    )


@app.route("/user/avg_emissions")
@jwt_required()
def avg_emissions():
    return str( 
        fem.foodAverage(current_identity.id) + VehicleCalculator.vehicleAvg(current_identity.id) + 8.44
    )

@app.route("/user/cal/<user_id>")
def calendar(user_id):
    """
    Callendar
    ---
    produces:
      - application/json
    parameters:
      - in: path
        name: user_id
        required: true
        schema:
            type: string
    responses:
        200:
            content:
                schema:
                    type: string
    """
    data = list(DataPoint
        .select(fn.Avg(DataPoint.gag).alias('avg'), DataPoint.time)
        .where(DataPoint.user == int(user_id))
        .group_by(DataPoint.time)
        .dicts())

    return jsonify(data)
    
@app.route("/user/datapoint", methods=["POST"])
@jwt_required()
def add_datapoint():

    dataPoint = namedtuple('Struct', request.json.keys())(*request.json.values())
    
    print(dataPoint)
    category = dataPoint.dataType.lower()
    gag = 0
    if category == "eat":
        gag = fem.calculateSingleEmission(dataPoint.selection.lower(), int(dataPoint.quantity.split(' ')[0])/1000)
    elif category == "commute":
        gag = VehicleCalculator.polutionCalc(dataPoint.selection.lower(), int(dataPoint.quantity.split(' ')[0]))

    d = None
    if dataPoint.date == "Today":
        d = date.today()
    elif dataPoint.date == "Yesterday":
        d = date.today() - timedelta(days=1)
    else:
        d = date.fromtimestamp(dataPoint.date) 

    res = DataPoint.create(user=current_identity.id, gag=gag, time=d, category=category)
    return str(res.id)

@jwt_required()
@app.route("/login", methods=["POST"])
def login():
    
    username = request.form.get("username")
    password = request.form.get("password")

    user=authenticate(username, password)
    if not user:
        raise Exception("User not found!")

    resp=jsonify({"message": "User authenticated"})
    resp.status_code=200

    access_token=jwt.jwt_encode_callback(user)

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

    return jsonify(model_to_dict(current_identity))

if __name__ == '__main__':
    app.run()

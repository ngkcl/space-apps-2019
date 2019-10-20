from flask import Flask, jsonify, request
from flask_jwt import JWT, jwt_required, current_identity
from flasgger import Swagger

from playhouse.shortcuts import model_to_dict, dict_to_model
from datetime import datetime

from temperature.cmip5_utility import CMIP5
from co2.food_test import FoodEmission
from users.user import User, DataPoint
from VehicleCalculator import VehicleCalculator


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


@app.route('/data/time/<temperature>')
@jwt_required()
def time(temperature):
	"""

	"""
	temperature = float(temperature)
	emissions = FoodEmission.foodAverage(
	    current_identity.id) + VehicleCalculator.vehicleAvg(current_identity.id) + 8.44
	return cmip5.invTrace(emissions, temperature)


@app.route('/data/temperature/<emission>/')
@app.route('/data/temperature/<emission>/<int:year>')
def emission(emission, year=2200):
	"""
	emissions with year
	---
	produces:
	  -application/json
	parameters:
	  - in: path
		name: emission
		required: true
		schema:
			type: integer
		description: emission per year in metric tons
	  - in: path
		name: year
		required: false
		schema:
			type: integer
		description: Final year for graph, default 2200
	responses:
		200:
			content:
				schema:
					type: string
	"""
	step = 25
	return jsonify({'lables': cmip5.worstCase(year, step=step)[0], 'datasets': [
		{'color': 'red', 'data': cmip5.worstCase(year, step=step)[1]},
		{'color': 'green', 'data': cmip5.bestCase(year, step=step)[1]},
		{'color': '#AAA', 'data': cmip5.extrapolateOwnDeltaT(float(VehicleCalculator.vehicleAvg(
		    current_identity.id)) + float(FoodEmission.foodAverage(current_identity.id)), year, step=step)[1]}
	]})


@app.route('/data/vehicle/<distance>/<time>')
def vehicleArray(distance, time):
	"""
	Possible Vehicle
	---
	produces:
	  - application/json
	parameters:
	  - in: path
		name: distance
		required: true
		schema:
			type: number
		description: Takes distance travelled in km
	  - in: path
		name: time
		required: true
		schema:
			type: integer
		description: Takes time in which distance was travelled in seconds
	responses:
		200:
			content:
				schema:
					type: string
	"""
	return jsonify({'vehicleArray': VehicleCalculator.vehicleCalc(float(distance), float(time))})


@app.route('/data/polution/<vehicle>/<distance>')
def polutionOut(vehicle, distance):
	"""
	Polution out
	---
	produces:
	  -application/json
	parameters:
	  - in: path
		name: vehicle
		required: true
		schema:
			type: string
		description: Take vehicle either "car", "train", "flight", "car", "bus", "coach", "walking"
	  - in: path
		name: distance
		required: true
		schema:
			type: numbers
		description: Take distance in km
	responses:
		200:
			content:
				schema:
					type: string
	"""
	return jsonify({'carbonDioxideGrams': VehicleCalculator.polutionCalc(vehicle, float(distance))})


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
		User.create(username=user['username'], password=user['password']).id
	)


@app.route("/user/datapoint", methods=["POST"])
def add_datapoint():
	"""
	Register yourself
	---
	consumes:
	  - application/json
	produces:
	  - application/json
	parameters:
	  - in: body
		name: datapoint
		description: JSON data point.
		schema:
			type: object
			properties:
				gag:
					type: number
				time:
					type: integer
				category:
					type: string
	responses:
		200:
			content:
				schema:
					type: string
	"""
	dataPoint = request.json
	res = DataPoint.create(user=current_identity, gag=dataPoint.gag, time=datetime.fromtimestamp(dataPoint.time, category=category))
	return str(res.id)

@jwt_required()
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
	username=request.form.get("username")
	password=request.form.get("password")

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

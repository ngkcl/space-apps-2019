from flask import Flask, jsonify
from flask_jwt import JWT, jwt_required, current_identity

from temperature.cmip5_utility import CMIP5
from user.user import User, DataPoint

cmip5 = CMIP5()

app = Flask(__name__)

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


if __name__ == '__main__':
    app.run()
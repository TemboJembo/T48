from flask import Flask, request, jsonify
from flask_cors import CORS
import jwt
import datetime
from functools import wraps

app = Flask(__name__)
CORS(app)

SECRET_KEY = "mysecretkey"
VALID_USERNAME = 'thomas'
VALID_PASSWORD = 'thomas'

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if username == VALID_USERNAME and password == VALID_PASSWORD:
        token = jwt.encode({'user': username}, SECRET_KEY, algorithm='HS256')
        return jsonify({'token': token})
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing'}), 403
        try:
            token = token.split()[1]
            jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        except:
            return jsonify({'message': 'Token is invalid'}), 403
        return f(*args, **kwargs)
    return decorator

@app.route('/api/chart/summary', methods=['GET'])
@token_required
def summary_chart():
    return jsonify({
        'labels': ["Natural Gas", "Coal", "Wind", "Hydro"],
        'data': [43, 16, 10, 5],
        'source': "https://example.com/clean-energy-data"
    })

@app.route('/api/chart/reports', methods=['GET'])
@token_required
def reports_chart():
    return jsonify({
        'labels': ["2021", "2022", "2023", "2024"],
        'data': [200000, 175000, 265000, 340000],
        'source': "https://example.com/yearly-clean-energy-report"
    })

@app.route('/dashboard-data', methods=['GET'])
def dashboard_data():
    data = {
        'total_energy': 10000,  # Example: Total energy produced in kWh
        'new_innovations': 50,  # Example: Number of new clean energy innovations
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(port=3000)
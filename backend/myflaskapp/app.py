from flask import Flask, render_template, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt
from werkzeug.security import generate_password_hash, check_password_hash
import querier, json

credentials = json.load(open('/home/bunny/repos/ordering-app/backend/myflaskapp/credentials.json'))

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = credentials['JWT_SECRET_KEY']
jwt = JWTManager(app)

users = { 'admin': generate_password_hash('admin'), 'user': generate_password_hash('user')}

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    if username in users and check_password_hash(users[username], password):
        role = 'admin' if username == 'admin' else 'user'
        additional_claims = {"role": role}
        access_token = create_access_token(identity=username, additional_claims=additional_claims)
        return jsonify(access_token=access_token, role=role), 200
    return jsonify({'msg': 'Invalid username or password'}), 400

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def home(path):
    return render_template('index.html')


@app.route('/api/form', methods=['POST'])
def handle_form():
    form_data = request.json
    
    querier.create_request(form_data)
    response = {
        'status': 'success',
        'data': form_data
    }
    return jsonify(response)

# REQUESTS
@app.route('/api/requests', methods=['GET'])
@jwt_required()
def get_requests():
    return jsonify(querier.read_requests())

@app.route('/api/requests/accept/<int:id>', methods=['POST'])
@jwt_required()
def accept_request(id):
    claims = get_jwt()
    print(claims)
    if claims['role'] == 'admin':
        querier.update_request_status(id, 1)
        querier.request_to_order(id)
        return jsonify({'status': 'success'}), 200
    else:
        return jsonify({'status': 'error', 'message': 'Unauthorized'}), 401

@app.route('/api/requests/deny/<int:id>', methods=['POST'])
@jwt_required()
def deny_request(id):
    claims = get_jwt()
    print(claims)
    if claims['role'] == 'admin':
        querier.update_request_status(id, 0)
        return jsonify({'status': 'success'}), 200
    else:
        return jsonify({'status': 'error', 'message': 'Unauthorized'}), 401

# ORDERS
@app.route('/api/orders', methods=['GET'])
@jwt_required()
def get_orders():
    return jsonify(querier.read_orders())

@app.route('/api/orders/<int:id>', methods=['PUT'])
@jwt_required()
def update_order(id):
    claims = get_jwt()
    if claims['role'] == 'admin':
        data = request.json
        # print(data)
        querier.update_order(id, data)
        return jsonify({'status': 'success'}), 200
    else:
        return jsonify({'status': 'error', 'message': 'Unauthorized'}), 401

if __name__ == '__main__':
    app.run(debug=True)

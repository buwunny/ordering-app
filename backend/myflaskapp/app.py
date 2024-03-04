from flask import Flask, render_template, request, jsonify
import querier

app = Flask(__name__)

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
def get_requests():
    return jsonify(querier.read_requests())

@app.route('/api/requests/accept/<int:id>', methods=['POST'])
def accept_request(id):
    print(f'ID: {id}')
    querier.update_request_status(id, 1)
    querier.request_to_order(id)
    return jsonify({'status': 'success'})

@app.route('/api/requests/deny/<int:id>', methods=['POST'])
def deny_request(id):
    querier.update_request_status(id, 0)
    return jsonify({'status': 'success'})
# ORDERS
@app.route('/api/orders', methods=['GET'])
def get_orders():
    return jsonify(querier.read_orders())

if __name__ == '__main__':
    app.run(debug=True)

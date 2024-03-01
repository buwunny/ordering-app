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


@app.route('/api/requests')
def get_requests():
    requests = querier.read_requests()
    return jsonify(requests)

if __name__ == '__main__':
    app.run(debug=True)

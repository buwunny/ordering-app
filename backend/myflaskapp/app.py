from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit_textarea():
    text = request.form['text']
    print(text)
    # You can now use the 'text' variable to perform your operations
    return home()

# def hello_world():
#     return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)



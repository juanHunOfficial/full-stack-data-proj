from flask import Flask, send_from_directory

app = Flask(__name__, static_folder="dist", static_url_path='')

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory(app.static_folder, path)

@app.route('/api/hello')
def hello():
    return {'msg': 'Hello from Flask + Vite!'}

if __name__ == '__main__':
    app.run()
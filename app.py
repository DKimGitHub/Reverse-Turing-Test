from flask import Flask, send_from_directory
from flask_cors import CORS

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app)

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

# create game
@app.route('/api/games', methods=['POST'])
def create_game():
    return {
        'id': 1,
    }

# join game

# get game state

# ask question

# answer question

# rate question

if __name__ == '__main__':
    app.run()

from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

# create game

# join game

# get game state

# ask question

# answer question

# rate question

if __name__ == '__main__':
    app.run()

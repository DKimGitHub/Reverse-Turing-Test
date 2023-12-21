from flask import Flask, send_from_directory, g
from flask_cors import CORS
from peewee import *
from playhouse.shortcuts import model_to_dict
from uuid import uuid4

DATABASE = 'rtt.db'

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app)

database = SqliteDatabase(DATABASE)

class BaseModel(Model):
    class Meta:
        database = database

class Game(BaseModel):
    id = UUIDField(primary_key=True)

class Answer(BaseModel):
    id = AutoField()
    text = TextField()
    correct = BooleanField()

class Question(BaseModel):
    id = AutoField()
    game = ForeignKeyField(Game, backref='questions')
    player_answer = ForeignKeyField(Answer)
    bot_answer = ForeignKeyField(Answer)
    text = TextField()

def create_tables():
    with database:
        database.create_tables([Game, Question, Answer])

@app.before_request
def before_request():
    g.db = database
    g.db.connect()

@app.after_request
def after_request(response):
    g.db.close()
    return response

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

# create game
@app.route('/api/games', methods=['POST'])
def create_game():
    game = Game.create(id=uuid4())
    return model_to_dict(game)

# join game

# get game state

# ask question
# - get game and any previous questions and bot answers
# - create question
# - create bot answer by sending previous questions, previous bot answers and new question to GPT

# answer question

# rate question

if __name__ == '__main__':
    create_tables()
    app.run()

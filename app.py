from flask import Flask, send_from_directory, g
from flask_cors import CORS
from peewee import *
from playhouse.shortcuts import model_to_dict
from uuid import uuid4
import logging
logger = logging.getLogger('peewee')
logger.addHandler(logging.StreamHandler())
logger.setLevel(logging.DEBUG)

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
    correct = BooleanField(default=False)

class Question(BaseModel):
    id = AutoField()
    game = ForeignKeyField(Game, backref='questions')
    player_answer = ForeignKeyField(Answer, null=True)
    bot_answer = ForeignKeyField(Answer, null=True)
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
    question = Question.create(
        game=game,
        player_answer=None,
        bot_answer=None,
        text='What is the capital of France?'
    )
    player_answer = Answer.create(
        text='Paris, duh'
    )
    bot_answer = Answer.create(
        text='Why, Paris, of course!'
    )
    question.player_answer = player_answer
    question.bot_answer = bot_answer
    question.save()

    next_question = Question.create(
        game=game,
        player_answer=None,
        bot_answer=None,
        text='What is the capital of Germany?'
    )
    next_player_answer = Answer.create(
        text='Berlin, duh'
    )
    next_bot_answer = Answer.create(
        text='Why, Berlin, of course!'
    )
    next_question.player_answer = next_player_answer
    next_question.bot_answer = next_bot_answer
    next_question.save()

    return model_to_dict(game)

# get game state
@app.route('/api/games/<uuid:game_id>')
def get_game(game_id):
    PlayerAnswer = Answer.alias()
    BotAnswer = Answer.alias()

    game = (Game
        .select(Game, Question, PlayerAnswer, BotAnswer)
        .join(Question)
        .join(PlayerAnswer, JOIN.LEFT_OUTER, on=(Question.player_answer == PlayerAnswer.id))
        .switch(Question)
        .join(BotAnswer, JOIN.LEFT_OUTER, on=(Question.bot_answer == BotAnswer.id))
        .where(Game.id == game_id)
        .order_by(Question.id.asc())
        .get()
    )

    game_dict = model_to_dict(game)
    game_dict['questions'] = [model_to_dict(question) for question in game.questions]

    return game_dict

# ask question
# - get game and any previous questions and bot answers
# - create question
# - create bot answer by sending previous questions, previous bot answers and new question to GPT

# answer question

# flag answer as correct
@app.route('/api/answers/<int:answer_id>', methods=['PUT'])
def rate_answer(answer_id):
    answer = Answer.get(Answer.id == answer_id)
    answer.correct = True
    answer.save()
    return model_to_dict(answer)

if __name__ == '__main__':
    create_tables()
    app.run()

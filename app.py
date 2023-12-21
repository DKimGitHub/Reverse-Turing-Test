from flask import Flask, send_from_directory, g, request, jsonify
from flask_cors import CORS
from constants import OPENAI_API_KEY
import openai
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

create_tables()

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

@app.route('/api/ask-question', methods=['POST'])
def ask_question():
    data = request.json
    game_id = data.get('game_id')
    new_question_text = data.get('question')

    new_question = Question.create(game=game_id, text=new_question_text, player_answer=None, bot_answer=None)

    recent_player_answers = (Question
                             .select(Question, Answer)
                             .join(Answer, JOIN.LEFT_OUTER, on=(Question.player_answer == Answer.id))
                             .where(Question.game == game_id)
                             .order_by(Question.id.desc())
                             .limit(3))

    messages = [{"role": "system", "content": "Your task is to provide an answer to the users question. Mimic the succinctness of the user's previous answers, avoiding verbosity, matching the users level of detail, verbosity, and reply length."}]

    for interaction in recent_player_answers:
        if interaction.player_answer:
            messages.append({"role": "user", "content": f"Previous player answers: {interaction.player_answer.text}"})

    messages.append({"role": "user", "content": f"New question text: {new_question_text}"})

    print("Messages sent to GPT:")
    for message in messages:
        print(message)
    client = openai.OpenAI(api_key=OPENAI_API_KEY)
    response = client.chat.completions.create(
        model="gpt-4",
        messages=messages
    )
    ai_answer_text = response.choices[0].message.content

    ai_answer = Answer.create(text=ai_answer_text)
    new_question.bot_answer = ai_answer
    new_question.save()

    return jsonify({
        'question_id': new_question.id,
        'ai_answer': ai_answer_text
    })

@app.route('/api/answer-question', methods=['POST'])
def answer_question():
    data = request.json
    question_id = data.get('question_id')
    user_answer_text = data.get('user_answer')

    user_answer = Answer.create(text=user_answer_text)
    question = Question.get_by_id(question_id)
    question.player_answer = user_answer
    question.save()

    return jsonify({'status': 'success'})

# flag answer as correct
@app.route('/api/answers/<int:answer_id>', methods=['PUT'])
def rate_answer(answer_id):
    answer = Answer.get(Answer.id == answer_id)
    answer.correct = True
    answer.save()
    return model_to_dict(answer)

if __name__ == '__main__':
    app.run()

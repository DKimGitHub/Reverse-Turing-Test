import requests

BASE_URL = "http://localhost:5000"

def create_game():
    response = requests.post(f"{BASE_URL}/api/games")
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Failed to create game: {response.text}")

def ask_question(game_id, question_text):
    payload = {
        "game_id": game_id,
        "question": question_text
    }
    response = requests.post(f"{BASE_URL}/api/ask-question", json=payload)
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Failed to ask question: {response.text}")

def answer_question(question_id, user_answer):
    payload = {
        "question_id": question_id,
        "user_answer": user_answer
    }
    response = requests.post(f"{BASE_URL}/api/answer-question", json=payload)
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Failed to answer question: {response.text}")

def get_game_state(game_id):
    response = requests.get(f"{BASE_URL}/api/games/{game_id}")
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Failed to get game state: {response.text}")

def main():
    try:
        game = create_game()
        game_id = game['id']
        print(f"Game created: {game_id}")

        while True:
            question_text = input("Enter a question (or type 'end' to finish): ")
            if question_text.lower() == 'end':
                break

            ai_response = ask_question(game_id, question_text)
            print(f"AI Answer: {ai_response['ai_answer']}")

            player_answer = input("Enter player's answer: ")
            answer_question(ai_response['question_id'], player_answer)

            game_state = get_game_state(game_id)
            print("Current Game State:", game_state)

        print("Game ended.")
    except Exception as e:
        print(str(e))

if __name__ == "__main__":
    main()

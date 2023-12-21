"use client";
import AskQuestion from "../../components/askQuestion";
import { useState, useEffect } from "react";
import Question from "../../components/question";

export default function Questioner({ searchParams }) {
  const gameId = searchParams.gameId;
  const [game, setGame] = useState(null);

  useEffect(() => {
    if (!gameId) return;

    const interval = setInterval(() => {
      fetch(`http://localhost:5000/api/games/${gameId}`)
        .then((res) => res.json())
        .then((data) => {
          setGame(data);
        });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  let canAsk = false;
  // check if the last question was answered
  if (game) {
    if (game.questions.length === 0) {
      canAsk = true;
    } else {
      const lastQuestion = game.questions[game.questions.length - 1];
      if (lastQuestion.player_answer) {
        canAsk = true;
      }
    }
  }

  return (
    <div>
      <div className="grid grid-cols-2 bg-slate-500 rounded-md">
        {game &&
          game.questions.map((question) => (
            <Question key={question.id} question={question} />
          ))}
      </div>
      {canAsk && <AskQuestion gameId={gameId} />}
    </div>
  );
}

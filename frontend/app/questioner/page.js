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

  return (
    <div>
      <div className="grid grid-cols-2 bg-slate-500 rounded-md">
        {game &&
          game.questions.map((question) => (
            <Question key={question.id} question={question} />
          ))}
      </div>
      <AskQuestion gameId={gameId} />
    </div>
  );
}

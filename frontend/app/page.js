"use client";
import { useState, useEffect } from "react";
import Ask from "../components/ask";
import Question from "../components/question"

export default function Home() {
  const [gameId, setGameId] = useState(null);
  const [game, setGame] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/games", { method: "POST", })
      .then((res) => res.json())
      .then((data) => {
        setGameId(data.id);
      });
  }, []);

  useEffect(() => {
    if (!gameId) return;

    fetch(`http://localhost:5000/api/games/${gameId}`)
      .then((res) => res.json())
      .then((data) => {
        setGame(data);
      });
  }, [gameId]);

  return (
    <div className="w-screen h-screen bg-slate-600">
      <div className="grid grid-cols-2 bg-slate-500 rounded-md">
        {game && game.questions.map((question) => (
          <Question key={question.id} question={question} />
        ))}
      </div>
      <Ask />
    </div>
  );
}

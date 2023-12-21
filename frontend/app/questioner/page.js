"use client";
import AskQuestion from "../../components/askQuestion";
import { useState, useEffect } from "react";
import Question from "../../components/question";
import { Textarea } from "@nextui-org/react";

export default function Questioner() {
  let gameId;
  const [game, setGame] = useState(null);

  useEffect(() => {
    
    gameId = localStorage.getItem("gameId") || ""
    if (!gameId) return;

    fetch(`http://localhost:5000/api/games/${gameId}`)
      .then((res) => res.json())
      .then((data) => {
        setGame(data);
      });
  }, []);

  const clickHandler = () => {
    return null;
  };
  return (
    <div>
      <div className="grid grid-cols-2 bg-slate-500 rounded-md">
        {game &&
          game.questions.map((question) => (
            <Question key={question.id} question={question} />
          ))}
      </div>
      <div className="min-h-36 flex justify-center items-center">
        <div className="w-[48rem] flex">
          <Textarea
            aria-label="Comment Field"
            className="flex-1"
            fullWidth
            placeholder="Ask your question!"
            minRows={1}
          />
          <button
            onClick={clickHandler}
            className="m-2 flex-none text-base font-medium leading-4"
          >
            Ask
          </button>
        </div>
      </div>{" "}
    </div>
  );
}

"use client";
import { Textarea } from "@nextui-org/react";
import { useState, useEffect } from "react";
import AnswerQuestion from "../../components/answerQuestion";

export default function Answerer({ searchParams }) {
  const gameId = searchParams.gameId;
  const [game, setGame] = useState(null);

  useEffect(() => {
    if (!gameId) return;

    fetch(`http://localhost:5000/api/games/${gameId}`)
      .then((res) => res.json())
      .then((data) => {
        setGame(data);
      });
  }, []);

  return (
    <div className="h-full">
      <div className="grid grid-cols-2 bg-slate-500 rounded-md">
        <p className="text-center text-medium h-8">Your Answers</p>
        <p className="text-center text-medium h-8">AI Answers</p>
        {game &&
          game.questions.map((question) => (
            <Question key={question.id} question={question} />
          ))}
      </div>
      {/* <div className="flex-col h-full">
          <div className="bg-slate-500 flex-col rounded-lg m-2 overflow-auto h-full">
            <p className="text-right min-w-min max-w-[80%] rounded-md m-2 p-2 bg-slate-400 ml-auto">
              test
            </p>
            <p className="min-w-min max-w-[80%] rounded-md m-2 p-2 bg-slate-400">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>
            <p className="text-right min-w-min max-w-[80%] rounded-md m-2 p-2 bg-slate-400 ml-auto">
              This is the next question
            </p>
          </div>
        </div>
        <div className="flex-col h-full">
          <div className="bg-slate-500 flex-col rounded-lg m-2 overflow-auto h-full">
            <p className="text-right min-w-min max-w-[80%] rounded-md m-2 p-2 bg-slate-400 ml-auto">
              test
            </p>
            <p className="min-w-min max-w-[80%] rounded-md m-2 p-2 bg-slate-400">
              BEEP BOOP AI ANSWERS LIKE THIS
            </p>
            <p className="text-right min-w-min max-w-[80%] rounded-md m-2 p-2 bg-slate-400 ml-auto">
              This is the next question
            </p>
          </div>
        </div>
      </div> */}
    <AnswerQuestion  gameId={gameId} />
    </div>
  );
}

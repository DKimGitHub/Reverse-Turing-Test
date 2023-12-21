"use client";
import { Textarea } from "@nextui-org/react";
import { useState } from "react";

export default function AnswerQuestion({ gameId, question }) {
  const [answer, setAnswer] = useState("");
  console.log(question);

  const clickHandler = () => {
    fetch("http://localhost:5000/api/answer-question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        game_id: gameId,
        question_id: question ? question.id : null,
        user_answer: answer,
      }),
    }).then(() => {
      setAnswer("");
    });
  };

  return (
    <div className="min-h-36 flex justify-center items-center">
      <div className="w-[48rem] flex">
        <Textarea
          aria-label="Answer Field"
          className="flex-1"
          fullWidth
          placeholder="Answer like an AI!"
          minRows={1}
          value={answer}
          onValueChange={setAnswer}
        />
        <button
          onClick={clickHandler}
          className="m-2 flex-none text-base font-medium leading-4"
        >
          Answer
        </button>
      </div>
    </div>
  );
}

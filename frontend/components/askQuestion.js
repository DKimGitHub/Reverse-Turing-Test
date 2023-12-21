"use client";
import { Textarea } from "@nextui-org/react";
import { useState } from "react";

export default function AskQuestion({ gameId }) {
  const [question, setQuestion] = useState("");

  const clickHandler = () => {
    fetch('/api/ask-question', {
      method: 'POST',
      body: JSON.stringify({
        game_id: gameId,
        question
      })
    })
      .then(() => {
        setQuestion('');
      });
  }

  return (
    <div className="min-h-36 flex justify-center items-center">
      <div className="w-[48rem] flex">
      <Textarea
        aria-label="Question Field"
        className="flex-1"
        fullWidth
        placeholder="Ask your question!"
        minRows={1}
        value={question}
        onValueChange={setQuestion}
      />
      <button
        onClick={clickHandler}
        className="m-2 flex-none text-base font-medium leading-4"
      >
        Ask
      </button>
      </div>

    </div>
  );
}

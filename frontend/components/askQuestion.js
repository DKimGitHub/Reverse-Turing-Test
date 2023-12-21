"use client";

import { Textarea } from "@nextui-org/react";

export default function AskQuestion() {

const clickHandler = () => {
    return null
}
    return (
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

    </div>
  );
}

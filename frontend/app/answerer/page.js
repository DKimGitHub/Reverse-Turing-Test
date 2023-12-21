"use client";
import AskQuestion from "../../components/askQuestion";

import Chat from "../../components/chat";
import { Textarea } from "@nextui-org/react";

export default function Answerer() {
    const clickHandler = () => {
        return null
    }
    return (
    <div className="h-full">
      <div className="h-4/5 grid grid-cols-2">
      <div className="flex-col h-full">
      <p className="text-center">Your Answers</p>
      <div className="bg-slate-500 flex-col rounded-lg m-2 overflow-auto h-full">
        <p className="text-right min-w-min max-w-[80%] rounded-md m-2 p-2 bg-slate-400 ml-auto">
          test
        </p>
        <p className="min-w-min max-w-[80%] rounded-md m-2 p-2 bg-slate-400">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum."
        </p>
        <p className="text-right min-w-min max-w-[80%] rounded-md m-2 p-2 bg-slate-400 ml-auto">
          This is the next question
        </p>
      </div>
    </div>
    <div className="flex-col h-full">
      <p className="text-center">AI Answers</p>
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
      </div>

      <div className="min-h-36 flex justify-center items-center">
        <div className="w-[48rem] flex">
          <Textarea
            aria-label="Comment Field"
            className="flex-1"
            fullWidth
            placeholder="Answer the question like an AI!"
            minRows={1}
          />
          <button
            onClick={clickHandler}
            className="m-2 flex-none text-base font-medium leading-4"
          >
            Answer
          </button>
        </div>
      </div>
    </div>
  );
}
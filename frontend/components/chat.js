"use client";

export default function Chat({ question, answer }) {
  return (
    <div className="flex-col">
      <div className="flex-col rounded-lg m-2 overflow-auto">
        <p className="text-right min-w-min max-w-[80%] rounded-md m-2 p-2 bg-slate-400 ml-auto">
          {question}
        </p>
        {answer && (
          <p className="min-w-min max-w-[80%] rounded-md m-2 p-2 bg-slate-400">
            {answer.text}
          </p>
        )}
      </div>
    </div>
  );
}

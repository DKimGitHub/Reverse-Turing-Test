"use client";
import AskQuestion from "../../components/askQuestion";
import Chat from "../../components/chat";

export default function Questioner() {
  return (
    <div className="h-full">
      <div className="h-4/5 grid grid-cols-2">
        <Chat />
        <Chat />
      </div>

      <AskQuestion />
    </div>
  );
}

"use client";
import Chat from "./chat";

const Question = ({ question }) => {
  return (
    <>
      <Chat question={question.text} answer={question.player_answer} />
      <Chat question={question.text} answer={question.bot_answer} />
    </>
  );
}

export default Question;
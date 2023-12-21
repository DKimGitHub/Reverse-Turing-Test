"use client";
import Chat from "./chat";

const Question = ({ question }) => {
  let humanFirst = localStorage.getItem('gameId')%2 ===0 ? true : false
  
  const voteHuman = () => {
    fetch(`http://localhost:5000/api/answers/question.player_answer.id`)
  }
  const voteRobot = () => {
    fetch(`http://localhost:5000/api/answers/question.bot_answer.id`)
  }
  return (
    humanFirst ? 
    <>
      <div onClick={voteHuman}>
        <Chat question={question.text} answer={question.player_answer} />
      </div>

      <div onClick={voteRobot}>
        <Chat question={question.text} answer={question.bot_answer} />
      </div>
    </>
    :
    <>
    <div onClick={voteRobot}>
      <Chat question={question.text} answer={question.bot_answer} />
    </div>
    <div onClick={voteHuman}>
      <Chat question={question.text} answer={question.player_answer} />
    </div>
  </>
  );
};

export default Question;

import React from "react";
import BoxAndRadioAnswers from "./answers/BoxAndRadioAnswers";
import InputAnswer from "./answers/InputAnswer";

export default function Question({
  currentQuestion,
  questionIndex,
  selectedAnswer,
  inputAnswer,
  handleAnswerSelect,
  handleInputChange,
  handleSubmit
}) {
  return (
    <div>
      <p>{questionIndex + 1} - {currentQuestion.question_text_en}</p>
      {currentQuestion.type === "One-choice" || currentQuestion.type === "Multiple-choice" ? (
        <BoxAndRadioAnswers
          currentQuestion={currentQuestion}
          selectedAnswer={selectedAnswer}
          handleAnswerSelect={handleAnswerSelect}
        />
      ) : (
        <InputAnswer
          inputAnswer={inputAnswer}
          handleInputChange={handleInputChange}
        />
      )}
      <br />
      <button
        onClick={handleSubmit}
        disabled={selectedAnswer.length === 0 && inputAnswer === ""}
        className="btn btn-answer"
      >
        Submit
      </button>
    </div>
  );
}

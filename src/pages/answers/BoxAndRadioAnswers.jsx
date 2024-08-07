import React from "react";

export default function BoxAndRadioAnswers({ currentQuestion, selectedAnswer, handleAnswerSelect }) {
  return (
    <>
      {currentQuestion.answers_en.map((answer, index) => (
        <div key={index}>
          <label>
            <input
              type={currentQuestion.type === "One-choice" ? "radio" : "checkbox"}
              name="answer"
              checked={selectedAnswer.includes(index)}
              onChange={() => handleAnswerSelect(index)}
            />
            {answer.answer_text}
          </label>
        </div>
      ))}
    </>
  );
}

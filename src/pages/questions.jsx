import React, { useState } from "react";
import Base from "./Base";
import ProgressBar from "./ProgressBar";
import questionsData from '../assets/questions.json';
import { Link } from "react-router-dom";

export default function Questions() {
  const [questions] = useState(questionsData.questions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [steps, setSteps] = useState(questions.map(() => ({ correct: null })));
  const [answers, setAnswers] = useState(questions.map(() => [])); 
  const [inputAnswers, setInputAnswers] = useState(questions.map(() => "")); 
  
  let [finalScore, setFinalScore] = useState(0);

  const handleAnswerSelect = (answerIndex) => {
    if (questions[currentQuestionIndex].type === "Multiple-choice") {
      setAnswers(prevAnswers => 
        prevAnswers.map((ans, i) => 
          i === currentQuestionIndex 
          ? (ans.includes(answerIndex) 
              ? ans.filter(index => index !== answerIndex) 
              : [...ans, answerIndex])
          : ans
        )
      );
    } else {
      setAnswers(prevAnswers =>
        prevAnswers.map((ans, i) => 
          i === currentQuestionIndex 
          ? [answerIndex] 
          : ans
        )
      );
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputAnswers(prevInputAnswers =>
      prevInputAnswers.map((ans, i) =>
        i === currentQuestionIndex ? value : ans
      )
    );
  };

  const updateFinalScore = (isCorrect) => {
    if (isCorrect) {
      setFinalScore(prevScore => prevScore + 1);
    }
  };

  const findNextUnansweredQuestionIndex = () => {
    for (let i = currentQuestionIndex + 1; i < steps.length; i++) {
      if (steps[i].correct === null) {
        return i;
      }
    }
    for (let i = 0; i < currentQuestionIndex; i++) {
      if (steps[i].correct === null) {
        return i;
      }
    }
    return -1;
  };

  const handleSubmit = () => {
    const currentQuestion = questions[currentQuestionIndex];
    let isCorrect = false;

    if (currentQuestion.type === "One-choice" || currentQuestion.type === "Multiple-choice") {
      const correctAnswers = currentQuestion.answers_en
        .map((answer, index) => answer.isCorrect ? index : null)
        .filter(index => index !== null);

      isCorrect = JSON.stringify(correctAnswers) === JSON.stringify(answers[currentQuestionIndex].sort());
    } else if (currentQuestion.type === "Input") {
      isCorrect = currentQuestion.answers_en.some(answer => 
        answer.answer_text.toLowerCase().trim() === inputAnswers[currentQuestionIndex].trim().toLowerCase()
      );
    }

    setSteps(prevSteps =>
      prevSteps.map((step, i) =>
        i === currentQuestionIndex ? { ...step, correct: isCorrect } : step
      )
    );

    updateFinalScore(isCorrect);

    const nextIndex = findNextUnansweredQuestionIndex();
    if (nextIndex !== -1) {
      setCurrentQuestionIndex(nextIndex);
    }
  };

  const handleProgressClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  if (steps.every(step => step.correct !== null)) {
    return (
      <Base>
        <div>
          <p>You have completed all the questions!</p>
          <ProgressBar steps={steps} onProgressClick={handleProgressClick} />
          <p>Result: {finalScore}/{steps.length}</p>
          <button className="btn btn-answer"><Link to="/">Return to Home</Link></button>
        </div>
      </Base>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Base>
      <div>
        <ProgressBar steps={steps} onProgressClick={handleProgressClick} />
        <p>{currentQuestionIndex + 1} - {currentQuestion.question_text_en}</p>
        {currentQuestion.type === "One-choice" || currentQuestion.type === "Multiple-choice" ? (
          currentQuestion.answers_en.map((answer, index) => (
            <div key={index}>
              <label>
                <input
                  type={currentQuestion.type === "One-choice" ? "radio" : "checkbox"}
                  name="answer"
                  checked={answers[currentQuestionIndex].includes(index)}
                  onChange={() => handleAnswerSelect(index)}
                />
                {answer.answer_text}
              </label>
            </div>
          ))
        ) : (
          <input
            type="text"
            value={inputAnswers[currentQuestionIndex]}
            onChange={handleInputChange}
          />
        )}
        <br />
        <button 
          onClick={handleSubmit} 
          disabled={answers[currentQuestionIndex].length === 0 && inputAnswers[currentQuestionIndex] === ""}
          className="btn btn-answer">
          Submit
        </button>
      </div>
    </Base>
  );
}

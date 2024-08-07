import React, { useState } from "react";
import Base from "./Base";
import ProgressBar from "./ProgressBar";
import Question from "./Question";
import questionsData from '../assets/questions.json';
import { Link } from "react-router-dom";

export default function Questions() {
  const [questions] = useState(questionsData.questions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [steps, setSteps] = useState(questions.map(() => ({ correct: null, scored: false })));
  const [answers, setAnswers] = useState(questions.map(() => [])); // Stores selected answers for each question
  const [inputAnswers, setInputAnswers] = useState(questions.map(() => "")); // Stores input answers for each question
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
    setFinalScore(prevScore => {
      const currentStep = steps[currentQuestionIndex];
      if (isCorrect && !currentStep.scored) {
        return prevScore + 1;
      } else if (!isCorrect && currentStep.correct && currentStep.scored) {
        return prevScore - 1;
      }
      return prevScore;
    });
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
        i === currentQuestionIndex ? { ...step, correct: isCorrect, scored: step.scored || isCorrect } : step
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
        <Question
          currentQuestion={currentQuestion}
          questionIndex={currentQuestionIndex}
          selectedAnswer={answers[currentQuestionIndex]}
          inputAnswer={inputAnswers[currentQuestionIndex]}
          handleAnswerSelect={handleAnswerSelect}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </Base>
  );
}

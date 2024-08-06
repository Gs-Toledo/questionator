import React, { useState } from "react";
import Base from "./Base";
import ProgressBar from "./ProgressBar";
import questionsData from '../assets/questions.json';

export default function Questions() {

  const [questions] = useState(questionsData.questions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [steps, setSteps] = useState(questions.map(() => ({ correct: null })));
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [inputAnswer, setInputAnswer] = useState("");
  let [finalScore, setFinalScore] = useState(0)

  const handleAnswerSelect = (answerIndex) => {
    if (questions[currentQuestionIndex].type === "Multiple-choice") {
      
      setSelectedAnswer(prev => 
        prev.includes(answerIndex) 
        ? prev.filter(index => index !== answerIndex) 
        : [...prev, answerIndex]
      );
    } else {
      setSelectedAnswer([answerIndex]);
    }
  };

  const handleInputChange = (e) => {
    setInputAnswer(e.target.value);
  };

  const updateFinalScore = (isCorrect) => {
    if (isCorrect) {
      setFinalScore(prevScore => prevScore + 1);
    }
  };
  const handleSubmit = () => {
    const currentQuestion = questions[currentQuestionIndex];
    let isCorrect = false;

    if (currentQuestion.type === "One-choice" || currentQuestion.type === "Multiple-choice") {

      const correctAnswers = currentQuestion.answers_en
        .map((answer, index) => answer.isCorrect ? index : null)
        .filter(index => index !== null);

      isCorrect = JSON.stringify(correctAnswers) === JSON.stringify(selectedAnswer.sort());
      
    } else if (currentQuestion.type === "Input") {
      
      isCorrect = currentQuestion.answers_en.some(answer => 
        answer.answer_text.toLowerCase().trim() === inputAnswer.trim().toLowerCase()
      );
    }

    setSteps(prevSteps =>
      prevSteps.map((step, i) =>
        i === currentQuestionIndex ? { ...step, correct: isCorrect } : step
      )
    );

    updateFinalScore(isCorrect)
    setSelectedAnswer([]);
    setInputAnswer("");
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);


  };

  if (currentQuestionIndex >= questions.length) {
    return (
      <Base>
        <div>
          <p>You have completed all the questions!</p>
            
          <ProgressBar steps={steps} />

          <p>Result: {finalScore}/{steps.length}</p>
        </div>
      </Base>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Base>
      <div>
        <ProgressBar steps={steps} />

        <p>{currentQuestion.question_text_en}</p>

        {currentQuestion.type === "One-choice" || currentQuestion.type === "Multiple-choice" ? (
          currentQuestion.answers_en.map((answer, index) => (

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

          ))
        ) : (
          <input
            type="text"
            value={inputAnswer}
            onChange={handleInputChange}
          />
        )}
        <br />
        <button 
          onClick={handleSubmit} 
          disabled={selectedAnswer.length === 0 && inputAnswer === ""}
          className="btn btn-answer">
          Submit
        </button>
      </div>
    </Base>
  );
}

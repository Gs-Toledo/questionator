import React from "react"
import logoQuiz from '../assets/quiz-logo.jpg'


export function StartQuiz() {

    return (
        <div>
            <img src={logoQuiz} className="Quiz-logo" alt="logo" />
            <p>
              Click to Begin the Quiz
            </p>
            
        </div>

    )
}
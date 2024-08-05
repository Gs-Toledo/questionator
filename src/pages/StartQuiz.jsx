import React from "react"
import logo from '../assets/logo.svg';


export function StartQuiz() {

    return (
        <div>
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Click to Begin the Quiz
            </p>
            <button className="btn btn-start">Start</button>
        </div>

    )
}
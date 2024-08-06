import React from "react"
import Base from "./Base"
import logoQuiz from '../assets/quiz-logo.jpg'
import { Link } from 'react-router-dom';


export default function Home()  {

    return (
        <Base>
          <div>
            <img src={logoQuiz} className="Quiz-logo" alt="logo" />
            <p>
              Click to Begin the Quiz
            </p>

            <button 
            className="btn" >
              <Link to="/questions"> Start</Link>
            </button>
            
          </div>
        </Base>
    )
}
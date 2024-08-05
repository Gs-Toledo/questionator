import React, { useState } from "react"
import Questions from "./Questions";
import { StartQuiz } from "./StartQuiz";


function ShowQuestions() {
  return <div><Questions /></div>
}

function ShowStartQuiz() {
  return <div><StartQuiz /></div>
}

export default function Home()  {

  const [showQuestionsComponent, setshowComponentQuestions] = useState(true);

  const startQuizQuestions = () => {
    setshowComponentQuestions(!showQuestionsComponent);
  };

    return (
        <div className="App">

        <header className='app-header'>
          <nav>
            <a href="/">Home</a> 
          </nav>
        </header>
        
        <section className="App-body">

          <div className="app-box">

          {showQuestionsComponent ?  <ShowStartQuiz /> : <ShowQuestions />}
          <button 
            className={`btn ${showQuestionsComponent ? 'd-none' : ''}`} 
            onClick={startQuizQuestions}>Start</button>

          </div>

        </section>
        
        </div>
    )
}
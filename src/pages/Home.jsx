import React from "react"
import Questions from "./Questions";
import { StartQuiz } from "./StartQuiz";

export default function Home()  {

    return (
        <div className="App">

        <header className='app-header'>
          <nav>
            <a href="/">Home</a> 
          </nav>
        </header>
        
        <body className="App-body">

          <div className="app-box">

            <StartQuiz />

          </div>

        </body>
        
        </div>
    )
}
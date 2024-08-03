import React from "react"
import logo from '../assets/logo.svg';

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
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Click to Begin the Quiz
            </p>
            <button className="btn btn-start" >Start</button>
          </div>
        </body>
        
        </div>
    )
}
import React from "react";
import { Link } from "react-router-dom";


export default function Base({children}) {
    return(
        <div className="App">

        <header className='app-header'>
          <nav>
            <Link to="/">Home</Link>
          </nav>
        </header>
        
        <section className="App-body">

          <div className="app-box">

            {children}

          </div>

        </section>
        
        </div>
    )
}
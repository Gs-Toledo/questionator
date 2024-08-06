import React from "react";


export default function Base({children}) {
    return(
        <div className="App">

        <header className='app-header'>
          <nav>
            <a href="/">Home</a> 
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
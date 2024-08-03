import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Home from './pages/Home';

function App() {

<Router>
      <div>
          <Route path="/" component={Home} />

      </div>
</Router>

  return (
    <p></p>
  )

}

export default App;

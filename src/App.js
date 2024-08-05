import './assets/styles/App.css';
import Home from './pages/Home';
import { useRoutes } from 'react-router-dom';
import Questions from './pages/Questions';


export default function App() {

  const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/Questions', element: <Questions /> }

  ]);
  return routes
}
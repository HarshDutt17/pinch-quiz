import Quiz from "./components/quiz";
import './styles/app.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Score from "./components/score";

function App() {
  return (
    <Router>
      <div className="App">
        <h1 className="text-center text-5xl font-bold text-gray-50 py-4 bg-blue-400 mb-2">
          Quiz
        </h1>
        <Routes>
          <Route path="/" exact element={<Quiz />} />
          <Route path="/score" exact element={<Score />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import Quiz from "./components/quiz";
import './styles/app.css';

function App() {
  return (
    <div className="App">
      <h1 className="text-center text-5xl font-bold text-gray-50 py-4 bg-blue-400 mb-2">
        Quiz
      </h1>
      <Quiz />
    </div>
  );
}

export default App;

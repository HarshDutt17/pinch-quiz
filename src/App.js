import { useState } from "react";
import Quiz from "./components/quiz";
import './styles/app.css';

function App() {
  const [user, setUser] = useState(null);
  const [start, setStart] = useState(false);
  return (
    <div className="App font-mono">
      <h1 className="flex font-sans justify-center items-center text-center text-5xl font-bold text-blue-primary py-4 bg-white ">
        <img src="/logo.svg" alt="Pinch" className="mb-2" />
        Quiz
      </h1>
      {!start &&
        <div className="flex-col mx-24 justify-center my-24 mobiles:mx-4">
          <p className="my-4">Enter your Name to start the Quiz!</p>
          <form onSubmit={({ start }) => setStart(true)} method="POST">
            <input
              aria-label="Enter your Email Address"
              type="text"
              placeholder="Your Name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-12 border mb-8 mobiles:mb-4"
              onChange={({ target }) => setUser(target.value)}
            />
            <button
              disabled={!user}
              type="submit"
              className={` 
                            bg-blue-secondary  text-white-primary w-1/6 mobiles:w-1/4 rounded h-8 font-bold
                            ${!user && `opacity-50`}     
                        `}>
              Start
            </button>
          </form>
        </div>
      }
      {start && <Quiz user={user} />}
    </div>
  );
}

export default App;

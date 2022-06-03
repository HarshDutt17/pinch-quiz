import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Quiz() {
    const [data, setData] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [score, setScore] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [answered, setAnswered] = useState(false)
    const [correctAnswer, setCorrectAnswer] = useState(null);

    const history = useNavigate();

    useEffect(() => {
        if(!fetched){
            getData();
        }
        const interval = setInterval(() => {
            setFetched(false);
        }, 1000 * 60 * 60);
        return () => clearInterval(interval);
    }, [fetched]);

    const getData = () => {
        Papa.parse(
            "https://docs.google.com/spreadsheets/d/1Mjz9tF5Sz2Q3TRvdzloSlDVJNqNgkjSCKwla6QF_7Ps/pub?output=csv",
            {
                download: true,
                header: true,
                complete: (results) => {
                    setData(results.data.map((item, idx) => ({ ...item, id: idx })));
                    setFetched(true);
                }
            }
        );
    };
    console.log(data);

    const handleAnswer = (event) => {
        event.preventDefault();
        // console.log(userAnswer, data[questionNumber].Ans)
        if (event.target.innerHTML === data[questionNumber].Ans) {
            setScore((score) => (score + 1));
            setCorrectAnswer(true);
        } else {
            setCorrectAnswer(false);
        }
        setAnswered(true);
        setData({...data,  [questionNumber] : {...data[questionNumber], userAns: event.target.innerHTML } })
        console.log(answered)
    }

    const nextQuestion = () => {
        if (questionNumber >= data.length - 1) {
            history("/score");
        }
        setQuestionNumber(questionNumber + 1);
        setAnswered(false);
    }


    return (
        <div className="">
            <p className="fixed bg-purple-600/50 right-5 border-blue-400 border-4 rounded-full text-yellow-400 font-bold px-4 py-4">
                Your Score is {score}
            </p>
            {fetched &&
                <div key={data[questionNumber].id} className="border rounded-lg py-4 mx-4 my-4 px-4">
                    <h1 className="text-xl mb-2">{data[questionNumber].Questions}</h1>
                    {!answered && (
                        <div className="mt-4">
                            <button id="ansA" className={`border mx-4 bg-blue-400 hover:bg-blue-500 text-white font-medium px-4 py-4 my-2 rounded ${answered && `opacity-50`}`} onClick={(event) => handleAnswer(event)}>
                                {data[questionNumber].A}
                            </button>
                            <button id="ansB" className={`border mx-4 bg-blue-400 hover:bg-blue-500 text-white font-medium px-4 py-4 my-2 rounded ${answered && `opacity-50`}`} onClick={(event) => handleAnswer(event)}>
                                {data[questionNumber].B}
                            </button>
                            <button id="ansC" className={`border mx-4 bg-blue-400 hover:bg-blue-500 text-white font-medium px-4 py-4 my-2 rounded ${answered && `opacity-50`}`} onClick={(event) => handleAnswer(event)}>
                                {data[questionNumber].C}
                            </button>
                            <button id="ansD" className={`border mx-4 bg-blue-400 hover:bg-blue-500 text-white font-medium px-4 py-4 my-2 rounded ${answered && `opacity-50`}`} onClick={(event) => handleAnswer(event)}>
                                {data[questionNumber].D}
                            </button>
                        </div>
                    )}
                    {answered && (
                        <>
                            <div>
                                <p>{correctAnswer ? "Thats Correct!" : "Oops! That was Incorrect."}</p>
                                <p>{correctAnswer ? "Your answer was" : "Correct Answer was "} <span className="text-green-500">{data[questionNumber].Ans}</span></p>
                                <p>Explanation : {data[questionNumber].Explanation}</p>
                            </div>
                            <button
                                className="flex justify-end w-full text-blue-400 font-bold cursor-pointer px-2"
                                onClick={nextQuestion}
                            >
                                Next Question
                            </button>
                        </>
                    )}
                </div>
            }
        </div>
    );
}

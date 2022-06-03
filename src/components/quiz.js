import Papa from "papaparse";
import { useEffect, useState } from "react";
import ScoreDisplay from "./scoreDisplay";

export default function Quiz({user}) {
    const [data, setData] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [score, setScore] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [answered, setAnswered] = useState(false)
    const [correctAnswer, setCorrectAnswer] = useState(null);


    useEffect(() => {
        if (!fetched) {
            getData();
        }
        const interval = setInterval(() => {
            setFetched(false);
        }, 1000 * 60 * 60);
        return () => clearInterval(interval);
    }, [fetched, questionNumber]);

    const getData = () => {
        Papa.parse(
            "https://docs.google.com/spreadsheets/d/1Mjz9tF5Sz2Q3TRvdzloSlDVJNqNgkjSCKwla6QF_7Ps/pub?output=csv",
            {
                download: true,
                header: true,
                complete: (results) => {
                    const result = results.data.map((item, idx) => ({ ...item, id: idx }));
                    const shuffled = [...result].sort(() => 0.5 - Math.random());
                    setData(shuffled.slice(0, 10));
                    setFetched(true);
                }
            }
        );
    };
    console.log(data);

    const handleAnswer = (event) => {
        event.preventDefault();
        // console.log(userAnswer, data[questionNumber].Ans)
        if (event.target.innerHTML === data[questionNumber].Ans || data[questionNumber].Ans==="") {
            setScore((score) => (score + 1));
            setCorrectAnswer(true);
        } else {
            setCorrectAnswer(false);
        }
        setAnswered(true);
        setData(data.map((item,idx) => (idx === questionNumber ? {...item, userAns: event.target.innerHTML} : {...item} )))
        console.log(answered)
    }

    const nextQuestion = () => {
        setQuestionNumber(questionNumber + 1);
        console.log("length of data",data.length)
        setAnswered(false);
    }


    return (
        <div className="">
            {fetched && <>
            {questionNumber <= data.length-1 ? (
                <div key={data[questionNumber].id} className="border border-blue-secondary h-min-80 rounded-lg mx-20 my-4 px-12 py-12">
                    <h1 className="text-xl mb-2">{data[questionNumber].Questions}</h1>
                    {!answered && (
                        <div className="mt-4">
                            <button id="ansA" className={`border mx-4 bg-white-secondary hover:bg-white-primary text-purple-secondary font-medium px-4 py-4 my-2 rounded ${answered && `opacity-50`}`} onClick={(event) => handleAnswer(event)}>
                                {data[questionNumber].A}
                            </button>
                            <button id="ansB" className={`border mx-4 bg-white-secondary hover:bg-white-primary text-purple-secondary font-medium px-4 py-4 my-2 rounded ${answered && `opacity-50`}`} onClick={(event) => handleAnswer(event)}>
                                {data[questionNumber].B}
                            </button>
                            <button id="ansC" className={`border mx-4 bg-white-secondary hover:bg-white-primary text-purple-secondary font-medium px-4 py-4 my-2 rounded ${answered && `opacity-50`}`} onClick={(event) => handleAnswer(event)}>
                                {data[questionNumber].C}
                            </button>
                            <button id="ansD" className={`border mx-4 bg-white-secondary hover:bg-white-primary text-purple-secondary font-medium px-4 py-4 my-2 rounded ${answered && `opacity-50`}`} onClick={(event) => handleAnswer(event)}>
                                {data[questionNumber].D}
                            </button>
                        </div>
                    )}
                    {answered && (
                        <>
                            <div>
                                <p className={`text-center ${!correctAnswer ? `text-red-600` : `text-green-600`} font-extrabold mt-12`}>{correctAnswer ? "Thats Correct!" : "Oops! That was Incorrect."}</p>
                                <p className="text-center text-3xl rounded-full text-yellow-400 font-bold px-4 py-4">
                                    Your Score is {score}
                                </p>
                            </div>
                            <div className="w-full flex justify-end">
                            <button
                                className="flex text-purple-primary font-bold cursor-pointer px-2"
                                onClick={nextQuestion}
                            >
                                Next Question
                            </button>
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <>
                    <ScoreDisplay data={data} score={score} user={user}/>
                </>
            )}
            </>}
        </div>
    );
}

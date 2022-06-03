export default function ScoreDisplay({ data, score, user }) {
    return (
        <div>
            <div className="flex flex-col justify-center items-center my-4 gap-2">
                {score < data.length / 2 ? (
                    <>
                        <img alt="sad" className="w-1/6 my-2" src="/sad.png" />
                        <p className="text-red-400 text-2xl">You need to try harder {user}!</p>
                    </>
                )
                    : (
                        <>
                            <img alt="happy" className="w-1/6 my-2" src="/happy.png" />
                            <p className="text-green-400 text-2xl">That was amazing {user}!</p>
                        </>
                    )}
                <p className="my-2 text-3xl font-extrabold"> Your score is {score}</p>
            </div>
            <div className="text-xl font-sans mx-12 my-4 border-t-2 py-4">
                <p className="py-4">Your detailed report :</p>
                <div>
                    {data.map((question,idx) => {return(
                        <div key={question.id} className="border border-blue-primary rounded px-4 py-8 mb-4 text-lg">
                            <p className="text-xl">Question {idx + 1}: {question.Questions}</p>
                            <p className={`${question.Ans === question.userAns || question.Ans === "" ? "text-green-600" : "text-red-600   "}`}>Your Answer : {question.userAns} </p>
                            <p>Correct Answer : {question.Ans}</p>
                            <p><span className="font-bold">Explanation</span> : {question.Explanation}</p>
                        </div>
                    )})}
                </div>
            </div>
        </div>
    )
}
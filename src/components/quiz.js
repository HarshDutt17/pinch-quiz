import Papa from "papaparse";
import { useEffect, useState } from "react";

export default function Quiz() {
    const [data, setData] = useState([]);
    const [score, setScore] = useState(0);

    useEffect(() => {
        getData();
        const interval = setInterval(() => {
            getData();
        }, 1000 * 60 * 60);
        return () => clearInterval(interval);
    }, []);

    const getData = () => {
        Papa.parse(
            "https://docs.google.com/spreadsheets/d/1Mjz9tF5Sz2Q3TRvdzloSlDVJNqNgkjSCKwla6QF_7Ps/pub?output=csv",
            {
                download: true,
                header: true,
                complete: (results) => {
                    setData(results.data.map( (item,idx ) => ({...item, id:idx})));
                }
            }
        );
    };
    console.log(data);

    return (
        <div className="">
            <p className="fixed bg-purple-600/50 right-5 border-blue-400 border-4 rounded-full text-yellow-400 font-bold px-4 py-4">
                Your Score is {score}
            </p>
            {data &&
                data.map((question) => {
                    return (
                        <div key={question.id} className="border rounded-lg py-4 mx-4 my-4 px-4">
                            <h1>{question.Questions}</h1>
                            <div className="mt-4">
                                <button className="border mx-4 px-4 py-4 rounded">
                                    {question.A}
                                </button>
                                <button className="border mx-4 px-4 py-4 rounded">
                                    {question.B}
                                </button>
                                <button className="border mx-4 px-4 py-4 rounded">
                                    {question.C}
                                </button>
                                <button className="border mx-4 my-4 px-4 py-4 rounded">
                                    {question.D}
                                </button>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}

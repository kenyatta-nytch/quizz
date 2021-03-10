import { decode } from '../lib/helpers'

function Results({ data }) {
    const {category, type, difficulty, score, results, amount} = data
    return (
        <div className="w-full">
            <div className="m-auto sm:w-2/3 lg:w-1/2">
                <div className="px-2">
                    <div className="py-3 border-b">
                        <div className="flex flex-wrap justify-evenly text-gray-800">
                            <p>{category}</p>
                            <p>{type === null? 'Any Type': type}</p>
                            <p>{difficulty === null? 'Mixed Difficulty': difficulty}</p>
                        </div>
                        <div>
                            <h3 className="text-center text-xl">{score} <span className="text-gray-400 text-base">out of</span> {amount}</h3>
                        </div>
                    </div>
                </div>
                <div className="p-3">
                    {results && results.map((res, idx) => {
                        const correct = res.choice === res.answer
                        return (
                            <div key={idx} className={`my-2 shadow rounded border-r-8 border-l-8 ${correct? 'border-green-300':'border-red-300'}`}>
                                <p className="p-3 text-gray-900">{decode(res.question)}</p>
                                <div className={`py-2 flex justify-around`}>
                                    <p className="text-green-500"><span className="text-gray-400">Answer:</span> {decode(res.answer)}</p>
                                    {!correct ? <p className="text-red-500"><span className="text-gray-400">Your Choice:</span> {decode(res.choice)}</p> : null}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Results
import { decode } from '../lib/helpers'

function Results({ data }) {
    const {category, type, difficulty, score, results, amount} = data
    return (
        <div className="w-full">
            <div className="m-auto sm:w-2/3 lg:w-1/2">
                <div className="px-2 bg-gray-500 rounded">
                    <div className="py-3">
                        <div className="flex flex-wrap justify-evenly text-gray-800">
                            <p className="text-white font-semibold text-sm uppercase">{category}</p>
                            <p className="text-white font-semibold text-sm uppercase">{type === null? 'Any Type': type}</p>
                            <p className="text-white font-semibold text-sm uppercase">{difficulty === null? 'Mixed Difficulty': difficulty}</p>
                        </div>
                        <div>
                            <h3 className="text-center text-gray-100">You scored <span className="font-semibold text-white text-xl">{score}</span> out of <span className="font-semibold text-white text-xl">{amount}</span> questions correct</h3>
                        </div>
                    </div>
                </div>
                <div className="px-3">
                    {results && results.map((res, idx) => {
                        const correct = res.choice === res.answer
                        return (
                            <div key={idx} className={`my-2 shadow rounded border-r-8 border-l-8 ${correct? 'border-green-300':'border-red-300'}`}>
                                <p className="p-3 text-gray-900">{decode(res.question)}</p>
                                <div className={`flex md:flex-row flex-col justify-around items-center`}>
                                    <p className="p-2 text-green-500"><span className="text-gray-400">Answer:</span> {decode(res.answer)}</p>
                                    {!correct ? <p className="p-2 text-red-500"><span className="text-gray-400">Your Choice:</span> {decode(res.choice)}</p> : null}
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
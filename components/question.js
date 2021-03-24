import {useState, useEffect} from 'react';
import {decode} from '../lib/helpers';

const diff = {
    'easy': 'bg-green-400',
    'medium': 'bg-yellow-400',
    'hard': 'bg-red-400'
}

function Question({ data, onAnswerSelect}) {
    const [choice, setChoice] = useState('');

    function handleClick(ch) {
        setChoice(ch);
        onAnswerSelect(ch);
    }
    useEffect(() => setChoice(''), [data]);
    return (
        <div className={`rounded ${diff[data?.difficulty]}`}>
            <div className="bg-opacity-90 p-2 bg-white">
                <h3 className="p-2 text-xl font-semibold text-gray-900">{data && decode(data.question)}</h3>
                <div className="">
                    {data && data.choices.map((ch,idx) => (
                        <div
                            key={idx}
                            className={`p-2 flex justify-center align-center cursor-pointer transition ${choice === ch? `${diff[data?.difficulty]} bg-opacity-40 text-gray-900`:' bg-opacity-0 text-gray-500'}`}
                            onClick={_=> handleClick(ch)}
                        >
                            <p>{decode(ch)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Question
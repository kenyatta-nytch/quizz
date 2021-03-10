import {useState, useEffect} from 'react';
import {decode} from '../lib/helpers';

const diff = {
    'easy': 'bg-green-500',
    'medium': 'bg-yellow-500',
    'hard': 'bg-red-500'
}

function Question({ data, onAnswerSelect}) {
    const [choice, setChoice] = useState('');

    function handleClick(ch) {
        setChoice(ch);
        onAnswerSelect(ch);
    }
    useEffect(() => setChoice(''), [data]);
    return (
        <div className={`bg-opacity-20 rounded ${diff[data?.difficulty]}`}>
            <div className="p-2">
                <h3 className="p-2 text-lg font-medium text-gray-800">{data && decode(data.question)}</h3>
                <div className="">
                    {data && data.choices.map((ch,idx) => (
                        <div
                            key={idx}
                            className={`py-2 flex justify-center align-center cursor-pointer ${choice === ch? 'bg-blue-500 text-white':' bg-opacity-0 text-gray-600'}`}
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
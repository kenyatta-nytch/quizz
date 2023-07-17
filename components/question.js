import {useState, useEffect} from 'react';
import {decode} from '../lib/helpers';

const diff = {
	'easy': {bg: 'bg-green-400', color: 'text-green-400', border: 'border-green-400'},
	'medium': {bg: 'bg-yellow-400', color: 'text-yellow-400', border: 'border-yellow-400'},
	'hard': {bg: 'bg-red-400', color: 'text-red-400', border: 'border-red-400'}
}

function Question({ data, onAnswerSelect}) {
	const [choice, setChoice] = useState('');

	function handleClick(ch) {
		setChoice(ch);
		onAnswerSelect(ch);
	}
	useEffect(() => setChoice(''), [data]);

	const choiceStyles = () => {
		const isBooleanType = data && data.choices.find((ch) => ch.toLowerCase() === 'true' || ch.toLowerCase() === 'false');
		const isChoicesShort = data && data.choices.find((ch) => ch.length > 45);

		if (isBooleanType || !isChoicesShort) return 'grid grid-cols-2';
		return ''
	}
	return (
		<div className="rounded border border-gray-200 shadow-md p-2">
			<div className='px-2 flex justify-end'>
				<div className={`flex justify-evenly items-center px-1 border rounded-full ${diff[data?.difficulty]?.border}`}>
					<span className={`block w-2 h-2 rounded-full ${diff[data?.difficulty]?.bg}`}></span>
					<p className={`text-sm px-1 capitalize ${diff[data?.difficulty]?.color}`}>{data?.difficulty}</p>
				</div>
			</div>
			<div className="bg-white">
				<h3 className="p-2 text-xl font-semibold text-gray-900">{data && decode(data.question)}</h3>
				<div className={choiceStyles()}>
					{data && data.choices.map((ch,idx) => (
						<div
							key={idx}
							className={`p-2 flex justify-center align-center cursor-pointer transition ${choice === ch? "bg-primary text-white":'text-gray-500 hover:bg-purple-100'}`}
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
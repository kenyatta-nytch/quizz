import { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Error from 'next/error'
import { processData } from '../lib/helpers';
import { Result, Question, WithSave } from '../components';
import { useSettings } from '../context/settings';
import { QuizButton } from '../components/common'

function Quiz(){
	const {data: session} = useSession();
	const [data, setData] = useState();
	const [error, setError] = useState();

	const [counter, setCounter] = useState(0);
	const [currentQtn, setQuestion] = useState(data?.[counter])
	const [userAnswers, setAnswers] = useState([]);
	const [isFinished, setFinished] = useState(false);
	const [isAnswered, setAnswered] = useState(false);

	const [results, setResults] = useState({})
	const {category, amount, type, difficulty} = useSettings()

	const handleAnswerSelect = ans => {
		const obj = {
			question: currentQtn.question,
			choice: ans,
			answer: currentQtn.answer
		}

		if (counter === userAnswers.length) {
			setAnswers(prev => {
				prev.push(obj);
				return prev
			})
		} else if(counter < userAnswers.length) {
			setAnswers(prev => {
				prev[counter] = obj;
				return prev
			})
		}

		setAnswered(true);
	}

	const next = () => {
		if (counter === data.length -1) {
			return;
		} else if(counter === userAnswers.length){
			return;
		} else {
			setCounter(prev => prev + 1);
			setAnswered(false);
		}
	}

	const finish = () => {
		const score = userAnswers.filter(res => res.choice === res.answer).length;
		const data = {
			user: session? session.user: null,
			category: category.name,
			type: type || 'Mixed Type',
			difficulty: difficulty || 'Mixed Difficulty',
			results: userAnswers,
			amount,
			score,
		}

		console.info('finished data:', data);
		setResults(data);
		setFinished(true);
	}

	useEffect(() => {
		async function fetchData() {
			const params = {category: category.id, amount, type, difficulty}

			try{
				const response = await axios.get('https://opentdb.com/api.php',{params});
				const value = processData(response.data)

				setData(value);
			} catch(error) {
				setError(error);
			}
		}
		fetchData();
	}, [])

	useEffect(() => { setQuestion(data?.[counter]) }, [counter, data])

	if (error) return <Error statusCode={error.code} title={error.message}/>

	return(
		<div className="h-full p-2 flex justify-center items-center">
			{isFinished? <Result data={results}/> : <div className="w-full sm:w-4/5 md:2/3 lg:w-1/2">
				<div>
					<Question data={currentQtn} onAnswerSelect={handleAnswerSelect}/>
				</div>
				<div className="py-2 w-full flex justify-center">
					{counter === data?.length -1?
						<QuizButton click={finish} isAnswered={isAnswered}>Finish Attempt</QuizButton> :
						<QuizButton click={next} isAnswered={isAnswered}>Next</QuizButton>}
				</div>
			</div>}
		</div>
	)
}

export default Quiz

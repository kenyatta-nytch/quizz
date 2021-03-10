import axios from 'axios';
import { useState, useEffect } from "react";
import { useSession } from 'next-auth/client';
import processData from '../lib/helpers';
import { Results, Question, WithSave } from '../components';
import { useSettings } from '../context/settings';
import { Button } from '../components/common'

function Quiz(){
    const [session] = useSession();
    console.log(session)
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
            type: type || 'Any Type',
            difficulty: difficulty || 'Any Type',
            results: userAnswers,
            amount,
            score,
        }

        setResults(data);
        setFinished(true);
    }

    // const previous = () => {
    //     if (counter === 0) {
    //         return;
    //     } else {
    //         setCounter(prev => prev - 1);
    //     }
    // }

    useEffect(async () => {
        const params = {category: category.id, amount, type, difficulty}

        try{
            const response = await axios.get('https://opentdb.com/api.php',{params});
            const value = processData(response.data)
    
            setData(value);
        } catch(error) {
            setError(error);
        }
    }, [])

    useEffect(() => { setQuestion(data?.[counter]) }, [counter, data])

    if (error) return <div>{error.message}</div>

    if (isFinished) {
        if (session) {
            return(
                <WithSave data={results}>
                    <Results data={results}/>
                </WithSave>
            )
        }
        return <Results data={results}/>
    }

    return(
        <div className="h-full p-2 flex justify-center items-center">
            <div className="w-full sm:w-4/5 md:2/3 lg:w-1/2">
                <div>
                    <Question data={currentQtn} onAnswerSelect={handleAnswerSelect}/>
                </div>
                <div className="py-2 w-full flex justify-center">
                    {counter === data?.length -1?
                        <Button click={finish} isAnswered={isAnswered}>Finish Attempt</Button> :
                        <Button click={next} isAnswered={isAnswered}>Next</Button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Quiz
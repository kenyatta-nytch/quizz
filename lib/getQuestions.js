import { useState } from 'react';
import axios from 'axios';
import processData from './helpers';


async function getQuestions(params) {
    const [data, setData] = useState()
    const [error, setError ] = useState()

    try{
        const response = await axios.get('https://opentdb.com/api.php',{params});
        const value = processData(response.data)

        setData(value);
    } catch(error) {
        setError(error);
    }

    // console.log(data, error)
    return {data, error}
}

export default getQuestions
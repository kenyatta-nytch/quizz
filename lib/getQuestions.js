import axios from 'axios';
import processData from './helpers';


async function getQuestions(params) {
	try{
		const response = await axios.get('https://opentdb.com/api.php',{params});
		const value = processData(response.data)

		return {value}
	} catch(error) {
		return {error};
	}
}

export default getQuestions
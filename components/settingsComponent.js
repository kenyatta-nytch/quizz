import Categories from './category'
import { useSettings } from '../context/settings'
import { Button } from './common'


const ACTIVE = "bg-secondary text-white font-semibold"
const INACTIVE = "text-gray-600 border border-gray-300 lg:hover:border-primary lg:hover:text-purple-500"

function Settings({start, categories}) {
	const { category, amount, setNumber, setType, type, setDifficulty, difficulty } = useSettings();
	return(
		<div className="flex-1 flex flex-col items-center">
			<Categories list={categories}/>
			<div className="w-full p-2 flex flex-col justify-evenly">
				<div className="flex-1 flex flex-col mb-2">
					<div className="relative mb-1 py-1 flex flex-col items-start">
						<p className="mb-2 text-gray-400 font-semibold bg-white">Question Type</p>
						<div className="px-2 flex-1 flex justify-start">
							<p className={`mr-5 py-1 px-3 text-center shadow-inner rounded-full cursor-pointer transition ease-linear duration-150 ${type === null? ACTIVE : INACTIVE} `} onClick={_=> setType(null)}>Mixed</p>
							<p className={`mr-5 py-1 px-3 text-center shadow-inner rounded-full cursor-pointer transition ease-linear duration-150 ${type === 'multiple'? ACTIVE : INACTIVE} `} onClick={_=> setType("multiple")}>Choices</p>
							<p className={`mr-5 py-1 px-3 text-center shadow-inner rounded-full cursor-pointer transition ease-linear duration-150 ${type === 'boolean'? ACTIVE : INACTIVE} `} onClick={_=> setType("boolean")}>True or False</p>
						</div>
					</div>
					<div className="relative mb-1 py-1 flex flex-col items-start">
						<p className="mb-2 text-gray-400 font-semibold bg-white">Difficulty</p>
						<div className="px-2 flex-1 flex justify-start">
							<p className={`mr-5 py-1 px-3 text-center shadow-inner rounded-full cursor-pointer transition ease-linear duration-150 ${difficulty === null? ACTIVE : INACTIVE}`} onClick={_=> setDifficulty(null)}>Mixed</p>
							<p className={`mr-5 py-1 px-3 text-center shadow-inner rounded-full cursor-pointer transition ease-linear duration-150 ${difficulty === 'easy'? ACTIVE : INACTIVE}`} onClick={_=> setDifficulty("easy")}>Easy</p>
							<p className={`mr-5 py-1 px-3 text-center shadow-inner rounded-full cursor-pointer transition ease-linear duration-150 ${difficulty === 'medium'? ACTIVE : INACTIVE}`} onClick={_=> setDifficulty("medium")}>Medium</p>
							<p className={`mr-5 py-1 px-3 text-center shadow-inner rounded-full cursor-pointer transition ease-linear duration-150 ${difficulty === 'hard'? ACTIVE : INACTIVE}`} onClick={_=> setDifficulty("hard")}>Hard</p>
						</div>
					</div>
				</div>
				<div className="mb-5 flex-1 flex justify-start items-center">
					<label className="text-gray-400 font-semibold">Number of Questions:</label>
					<input
						type="number"
						placeholder="5"
						value={amount}
						onChange={e => setNumber(e.target.value)}
						className="focus:outline-none border-b border-gray-300 w-12 text-center text-xl"
					/>
				</div>
				<div className='flex-1 flex justify-center items-center'>
					<Button type="primary" size="lg" click={start}>Start Quiz</Button>
				</div>
			</div>
		</div>
	)
}

export default Settings;

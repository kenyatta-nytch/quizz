import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react'
import { Button } from './common';
import { decode } from '../lib/helpers'

function Result({ data, close }) {
	const {data: session} = useSession();
	const [isSaving, setSave] = useState(false)
	const [isError, setIsError] = useState(false)
	const { push, pathname } = useRouter()

	async function handleSave() {
		setSave(true)

		if (!data.user) {
				setSave(false)
				return;
		}

		try {
				const response = await axios.post('/api/resultsdb', data)

				if (response.status === 200) {
						push('/profile')
				}

		} catch(error) {
				setIsError(true);
				throw new Error(error.message)
		}

		setSave(false)
	}

	const {category, type, difficulty, score, results, amount} = data
	return (
		<div className="w-full h-full">
			{close && (<div>
					<button type="button" className="p-1 text-xl" onClick={_ => close()}>&larr; Back</button>
			</div>)}
			<div className="h-full flex flex-col lg:flex-row">
				{pathname === '/profile'? null : <div className='flex items-center justify-center lg:flex-[2_2_0%]'>
					<div className="w-full h-full bg-secondary lg:bg-white lg:flex lg:flex-col lg:justify-center lg:items-center">
						<div className="py-3 lg:p-0 lg:ml-10">
							<div className="flex lg:flex-col justify-evenly text-gray-800 lg:mb-3">
								<p className="mb-2 text-white font-semibold text-sm lg:text-2xl lg:text-secondary uppercase">{category}</p>
								<p className="mb-2 text-white font-semibold text-sm lg:text-2xl lg:text-secondary uppercase">{type === null? 'Any Type': type}</p>
								<p className="mb-2 text-white font-semibold text-sm lg:text-2xl lg:text-secondary uppercase">{difficulty === null? 'Mixed Difficulty': difficulty}</p>
							</div>
							<div>
								<h3 className="text-center lg:text-left text-gray-100 lg:text-secondary lg:text-lg">You scored <span className="font-semibold text-xl lg:text-2xl">{score}</span> out of <span className="font-semibold text-xl lg:text-2xl">{amount}</span> questions correct</h3>
							</div>
						</div>
						<div className="absolute lg:relative lg:w-full my-2 flex justify-center">
							<div className={`${!session? 'hidden': ''} mx-2`}>{
								session? <Button
									type="primary"
									size="md"
									disabled={isSaving}
									click={() => handleSave()}
								>{isSaving? 'Saving..':'Save'}</Button> : null
							}</div>
							<div className="mx-2">
								<Button
									type="primary"
									size="md"
									disabled={isSaving}
									click={() => push('/settings')}
								>Retake</Button>
							</div>
						</div>
					</div>
				</div>}
				<div className="flex-1 lg:flex-[3_3_0%]">
					<div className="w-full max-h-screen overflow-y-auto flex flex-col items-center pb-44 md:pb-40 lg:pb-28">
						{results && results.map((res, idx) => {
							const correct = res.choice === res.answer
							return (
								<div key={idx} className={`my-2 max-w-sm md:max-w-none md:w-[460px] lg:w-[500px] shadow border-r-8 ${correct? 'border-green-300':'border-red-300'}`}>
									<p className="p-3 text-gray-900">{decode(res.question)}</p>
									<div className={`flex justify-around items-center`}>
										<p className="p-2 text-green-500"><span className="text-gray-400">Answer:</span> {decode(res.answer)}</p>
										{!correct ? <p className="p-2 text-red-500"><span className="text-gray-400">Your Choice:</span> {decode(res.choice)}</p> : null}
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Result;
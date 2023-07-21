import Error from 'next/error';
import { useState } from 'react';
import { useRouter } from "next/router";
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';

import { connectToDatabase } from '../lib'
import { Result, Avatar, ResultCard } from '../components'

export default function Profile({history, session, error}) {
	const [open, setOpen] = useState(null)
	const { push } = useRouter();

	if (error) return <Error title={error.message}/>

	if (!session) return <p>Login first to get access</p>

	// if (open) {
	// 	return (
	// 		<div className="relative">
	// 			<div className="">
	// 				<button type="button" className="p-1 text-xl" onClick={_ => setOpen(null)}>&larr; Back</button>
	// 			</div>
	// 			<Result data={open}/>
	// 		</div>
	// 	)
	// }

	const { name, email } = session.user;
	return (
		<div className="relative flex flex-1">
			<div style={{'flex': 2}} className='p-2 flex flex-col items-center'>
				{history && history.length > 0? (open ?
					(<Result data={open} close={() => setOpen(null)}/>) :
					(history.map((hs,idx) => <ResultCard key={idx} data={hs} click={setOpen}/>))) :
					<p className='text-secondary'>No quizzes yet. Take one</p>
				}
			</div>
			<div style={{'flex': 1}} className="p-2 text-white bg-secondary flex justify-center items-center">
				<div className=''>
					<div>
						<p className="text-2xl font-bold">{name || null}</p>
						<p className="">{email || null}</p>
						<p className="mt-1">Quizzes completed <span className="text-xl font-semibold inline">{history.length}</span></p>
					</div>
					<div className='mt-3'>
						<button
								type="button"
								onClick={() => push('/settings')}
								className="px-4 py-2 text-lg font-semibold rounded-full shadow-inner bg-white text-secondary"
							>
							Take Quizz
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export async function getServerSideProps({ req, res }){
	try {
		const {db} = await connectToDatabase()
		const session = await getServerSession(req, res, authOptions)
		const projection = {_id: 0, user_id: 0}

		const user = await db.collection('users').findOne(session.user)
		const cursor = await db.collection('history').find({user_id: user._id}).project(projection)
		const history = await cursor.toArray();

		return {
			props: {history, session}
		}
			
	}catch(error) {
		return {
			props: {
				error: {message: error.name}
			}
		}
	}
}

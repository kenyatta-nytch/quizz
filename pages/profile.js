import Error from 'next/error';
import { useState } from 'react';
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]';
import { connectToDatabase } from '../lib'
import { Result, Avatar, ResultCard } from '../components'

export default function Profile({history, session, error}) {
	const [open, setOpen] = useState(null)
	console.log(session);
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

	return (
		<div className="relative flex flex-1">
			<div style={{'flex': 3}}>
				{open ?
					(<Result data={open} close={() => setOpen(null)}/>) :
					(history.map((hs,idx) => <ResultCard key={idx} data={hs} click={setOpen}/>))
				}
			</div>
			<div style={{'flex': 2}} className="bg-purple-300">
				
			</div>
		</div>
	)
}

export async function getServerSideProps(context){
	try {
		const {db} = await connectToDatabase()
		const session = await unstable_getServerSession(
			context.req,
			context.res,
			authOptions
		)
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

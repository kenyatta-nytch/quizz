import Error from 'next/error';
import { useState } from 'react';
import { getSession, signOut } from 'next-auth/client'
import { connectToDatabase } from '../lib'
import { Results, Avatar } from '../components'

export default function Profile({history, session, error}) {
    const [open, setOpen] = useState(null)

    if (error) return <Error title={error.message}/>

    if (!session) return <p>Login first to get access</p>

    if (open) {
        return (
            <div className="relative">
                <div className="">
                    <button type="button" className="p-1 text-xl" onClick={_ => setOpen(null)}>&larr; Back</button>
                </div>
                <Results data={open}/>
            </div>
        )
    }

    return (
        <div className="m-auto h-full bg-gray-100 sm:w-1/2 md:w-2/5 divide-y">
            <div className="">
                <Avatar/>
            </div>
            <div className="py-3">
            {history.map((hs,idx) => (
                <div key={idx} onClick={_=> setOpen(hs)} className="bg-white w-5/6 mb-2 mx-auto p-2 divide-y cursor-pointer shadow-md">
                    <div className="py-1 text-center">
                        <p className="px-2 text-lg text-gray-700 inline">{hs.category}</p>
                        <p className="px-2 inline hidden"><span className="text-gray-500">Question Type: </span>{hs.type}</p>
                    </div>
                    <div className="py-1 text-center">
                        <p className="mx-3 px-2 inline text-gray-900"><span className="text-sm text-gray-500">Scored </span>{hs.score}</p>
                        <p className="mx-3 px-2 inline text-gray-900">{hs.amount}<span className="text-sm text-gray-500"> Questions</span></p>
                        <p className="mx-3 px-2 inline text-gray-900">{hs.type}</p>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}

export async function getServerSideProps(context){
    try {
        const {db} = await connectToDatabase()
        const session = await getSession(context)
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

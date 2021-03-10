import { useState } from 'react';
import { getSession, signOut } from 'next-auth/client'
import { connectToDatabase } from '../lib'
import { Results } from '../components'

export default function Profile({history, session}) {
    const [open, setOpen] = useState(null)

    if (!session) return <p>Login first to get access</p>

    if (open) {
        return (
            <div>
                <div>
                    <button type="button" onClick={_ => setOpen(null)}>Back</button>
                </div>
                <Results data={open}/>
            </div>
        )
    }

    return (
        <div>
            <button type="button" onClick={_=> signOut({callbackUrl: '/'})}>Sign Out</button>
            {history.map((hs,idx) => (
                <div key={idx} onClick={_=> setOpen(hs)} className="w-max p-2 divide-y cursor-pointer shadow-md">
                    <div className="py-1">
                        <p className="px-2 inline"><span className="text-gray-500">Quiz Category: </span>{hs.category}</p>
                        <p className="px-2 inline"><span className="text-gray-500">Question Type: </span>{hs.type}</p>
                    </div>
                    <div className="py-1">
                        <p className="px-2 inline"><span className="text-gray-500">Score: </span>{hs.score}</p>
                        <p className="px-2 inline"><span className="text-gray-500">Questions: </span>{hs.amount}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export async function getServerSideProps(context){
    const {db} = await connectToDatabase()
    const session = await getSession(context)
    const projection = {_id: 0, user_id: 0}

    const user = await db.collection('users').findOne(session.user)
    const cursor = await db.collection('history').find({user_id: user._id}).project(projection)
    const history = await cursor.toArray();

    return {
      props: {history, session}
    }
}

import Image from 'next/image'
import { useSession, signOut} from 'next-auth/client'
import { Button } from '../components/common'

function Avatar() {
    const [ session ] = useSession()

    const handleClick = () => signOut({callbackUrl: '/'})

    if (!session) return <div className="p-2 text-lg text-gray-700">Sign In required</div>

    return (
        <div className="flex px-4 py-6 divide-x bg-gray-700 rounded-sm">
            <div className="flex-1">
                <div className="m-auto relative w-20 h-20 rounded-full bg-gray-100 className">
                    {session?.user?.image &&
                        ( <Image
                                src={session.user.image}
                                alt="Avatar"
                                layout="fill"
                                objectFit="cover"
                            />)
                    }
                </div>
            </div>
            <div className="flex-1">
                <p className="block p-2 text-white">{session?.user?.name || session?.user?.email}</p>
                    <button type="button" className="p-2 focus:outline-none text-white" onClick={_ => handleClick()}>Sign Out</button>
            </div>
        </div>
    )
}

export default Avatar

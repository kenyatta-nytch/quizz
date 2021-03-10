import Link from "next/link";
import { useRouter } from "next/router";
import {useSession} from "next-auth/client";

function Header() {
    const [session, loading] = useSession();

    return(
        <div className="w-full h-16 shadow-md flex items-center justify-between">
            <Link href="/">
                <p className="px-2 text-xl font-medium cursor-pointer">QUIZZ</p>
            </Link>
            <StartQuiz session={session}/>
            <div className="px-2 cursor-pointer">{session? <LinkToProfile session={session}/> : <LinkToAuth/>}</div>
        </div>
    )
}

function LinkToProfile({session}) {
    return (
        <Link href='/profile'>
            <p>{session?.user?.email || session?.user?.name}</p>
        </Link>
    )
}

function LinkToAuth() {
    return (
        <Link href="/api/auth/signin">
            <p>Sign In</p>
        </Link>
    )
}

function StartQuiz({session}) {
    const { push } = useRouter()
    
    const handleClick = () => session? push('/settings') : push({query: {info: true}});

    return (
        <button className="bg-white px-3 py-2 cursor-pointer" onClick={_=> handleClick()}>Take Quiz</button>
    )
}

export default Header
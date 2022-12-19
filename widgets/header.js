import Link from "next/link";
import { useRouter } from "next/router";
import {useSession} from "next-auth/react";
import { Button, StyledLink } from "../components/common"

function Header() {
    const { data: session } = useSession();

    return(
        <header className="w-full shadow-md flex items-center justify-between">
            <Link href="/">
                <p className="px-2 text-xl font-medium cursor-pointer">QUIZZ</p>
            </Link>
            <StartQuiz session={session}/>
            <div className="px-2 cursor-pointer">{session? 
                <StyledLink to="/profile">{session?.user?.email || session?.user?.name}</StyledLink> :
                <StyledLink to="/auth/signin">Sign In</StyledLink>
            }</div>
        </header>
    )
}

function StartQuiz({session}) {
    const { push } = useRouter()
    
    const handleClick = () => session? push('/settings') : push('/?info=true');

    return (
        <Button type="primary" size="md" click={handleClick}>Take Quiz</Button>
    )
}

export default Header

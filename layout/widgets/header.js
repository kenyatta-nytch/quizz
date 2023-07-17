import Link from "next/link";
import { useRouter } from "next/router";
import {useSession} from "next-auth/react";
import { Button, StyledLink } from "../../components/common"

function Header() {
	const { data: session } = useSession();
	const { pathname } = useRouter();

	return(
		<header className={`w-full flex p-2 ${pathname !=='/'? 'text-white bg-secondary':''}`}>
			<div className="left flex flex-1">
				<Link href="/">
					<p className={`px-2 text-2xl font-bold cursor-pointer ${pathname ==='/'? 'text-secondary':''}`}>QUIZZ</p>
				</Link>
			</div>
			<div className="right flex justify-end flex-1">
				<div className="px-2 cursor-pointer">{
					session ? 
						<StyledLink to="/profile">{session?.user?.email || session?.user?.name}</StyledLink> :
						<StyledLink to="/auth/signin">Sign In</StyledLink>
				}</div>
			</div>
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

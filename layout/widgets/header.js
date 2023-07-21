import Link from "next/link";
import { useRouter } from "next/router";
import {useSession} from "next-auth/react";
import { Button, StyledLink } from "../../components/common"
import { useEffect } from "react";

function Header() {
	const { data: session } = useSession();
	const { pathname } = useRouter();

	return(
		<header className={`w-full flex`}>
			<div
				style={{ flex: pathname === '/profile'? 2 : 1 }}
				className={`left flex flex-1 p-2 ${['/', '/profile'].includes(pathname)? '': 'text-white bg-secondary'}`}
			>
				<Link href="/">
					<p className={`px-2 text-2xl font-bold cursor-pointer ${['/', '/profile'].includes(pathname)? 'text-secondary':''}`}>QUIZZ</p>
				</Link>
			</div>
			<div
				style={{ flex: pathname === '/profile'? 1 : 1 }}
				className={`right flex justify-end flex-1 p-2 ${pathname !=='/'? 'text-white bg-secondary':''}`}
			>
				<div className="px-2 cursor-pointer">{
					pathname !== '/profile'? (session ? 
						<StyledLink to="/profile">{session?.user?.email || session?.user?.name}</StyledLink> :
						<StyledLink to="/auth/signin">Sign In</StyledLink>) : null
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

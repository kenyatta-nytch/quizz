import Head from 'next/head'
import {useRouter} from 'next/router'
import { useSettings } from '../context/settings';
import { Information } from '../components'
import Header from './widgets/header'

function Layout({ children }) {
    const { query: {info} } = useRouter();
		const { showsettings } = useSettings();

    function renderInfo() {
			if (showsettings) {
				return (
					<Information/>
				)
			}
    }

    return(
			<div className="h-screen w-screen overflow-hidden flex flex-col">
				<Head>
					<title>Quizz</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<div id="modal__container" className="absolute top-0"></div>
				<Header/>
				<main className="flex-1 flex flex-col w-full">
					{children}
				</main>
				{/* <Footer/> */}
			</div>
    )
}

export default Layout

import Head from 'next/head'
import {useRouter} from 'next/router'
import { Information } from '../components'
import { Header, Footer } from '../widgets'

function Layout({ children }) {
    const { query: {info} } = useRouter()

    function renderInfo() {
        if (info) {
            return (
                <Information/>
            )
        }
    }

    return(
        <div className="min-h-screen grid grid-rows-layout">
            <Head>
                <title>Quizz</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div id="modal__container" className="absolute top-0"></div>
            <Header/>
            <main className="">
                {renderInfo()}
                {children}
            </main>
            <Footer/>
        </div>
    )
}

export default Layout

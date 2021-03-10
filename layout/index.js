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
        <div>
            <Head>
                <title>Quizz</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div id="modal__container"></div>
            <Header/>
            <main className="min-h-screen">
                {renderInfo()}
                {children}
            </main>
            <Footer/>
        </div>
    )
}

export default Layout
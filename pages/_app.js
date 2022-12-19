import { SessionProvider } from 'next-auth/react'
import { SettingsProvider } from '../context/settings'
import Layout from '../layout'
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }) {
  return(
    <SessionProvider session={pageProps.session}>
      <SettingsProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SettingsProvider>
    </SessionProvider>
  )
}

export default MyApp

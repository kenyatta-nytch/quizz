import { Provider } from 'next-auth/client'
import { SettingsProvider } from '../context/settings'
import Layout from '../layout'
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }) {
  return(
    <Provider session={pageProps.session}>
      <SettingsProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SettingsProvider>
    </Provider>
  )
}

export default MyApp

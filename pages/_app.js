import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { SessionProvider } from 'next-auth/react'
import { SettingsProvider } from '../context/settings'
import Layout from '../layout'
import { Loader } from '../components/common'
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url) => {
      console.info('loading page:', url, router.pathname);
      setLoading(true);
    }

    const handleStop = () => {
      console.info('page loaded');
      setLoading(false);
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)
    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router]);
  return(
    <SessionProvider session={pageProps.session}>
      <SettingsProvider>
        <Layout>
          {loading ? <Loader/> : <Component {...pageProps} />}
        </Layout>
      </SettingsProvider>
    </SessionProvider>
  )
}

export default MyApp

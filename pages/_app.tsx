import Head from 'next/head'
import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>기프티콘 계산기</title>
      </Head>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp

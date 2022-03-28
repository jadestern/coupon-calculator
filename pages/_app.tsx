import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>기프티콘 계산기</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp

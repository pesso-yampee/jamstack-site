import 'styles/globals.scss'
import { config } from '@fortawesome/fontawesome-svg-core'
import { AppProps } from 'next/app'
import Layout from 'components/layout'

import '@fortawesome/fontawesome-svg-core/styles.css' // Font Awesomeの設定
config.autoAddCss = false

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

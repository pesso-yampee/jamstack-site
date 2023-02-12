import 'styles/globals.scss'
import Layout from "components/layout"
import { AppProps } from "next/app"

import '@fortawesome/fontawesome-svg-core/styles.css' // Font Awesomeの設定
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false;

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
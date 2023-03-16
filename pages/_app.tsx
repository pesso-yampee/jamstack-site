import 'styles/globals.scss'
import { config } from '@fortawesome/fontawesome-svg-core'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect } from 'react'
import Layout from 'components/layout'
import * as gtag from 'lib/gtag'

import '@fortawesome/fontawesome-svg-core/styles.css' // Font Awesomeの設定
config.autoAddCss = false

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    function handleRouteChange(url: string) {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gatag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gtag.GA_MEASUREMENT_ID}');
      `,
        }}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

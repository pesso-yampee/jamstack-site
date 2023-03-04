import { ReactNode } from 'react'
import Footer from 'components/footer'
import Header from 'components/header'

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

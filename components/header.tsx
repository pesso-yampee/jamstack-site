import Logo from 'components/logo'
import Nav from 'components/nav'
import Container from 'components/container'
import styles from 'styles/header.module.scss'

export default function Header() {
  return (
    <>
      <header>
        <Container large>
          <div className={styles.flexContainer}>
            <Logo boxOn />
            <Nav />
          </div>
        </Container>
      </header>
    </>
  )
}

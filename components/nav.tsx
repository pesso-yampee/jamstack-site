import Link from 'next/link'
import { useState, useCallback } from 'react'
import styles from 'styles/nav.module.css'

export default function Nav(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false)

  const toggleNav = useCallback(() => {
    setOpen(!open)
  }, [open])

  const closeNav = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <nav id="navi" className={open ? styles.open : styles.close}>
      {open && (
        <style jsx global>
          {`
            @media (max-width: 767px) {
              body {
                overflow: hidden;
                position: fixed;
                width: 100%;
              }
            }
          `}
        </style>
      )}
      <ul className={styles.list}>
        <li>
          <Link href="/" onClick={closeNav}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" onClick={closeNav}>
            About
          </Link>
        </li>
        <li>
          <Link href="/blog" onClick={closeNav}>
            Blog
          </Link>
        </li>
      </ul>
      <button
        type="button"
        className={styles.burgerButton}
        aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
        aria-haspopup="true"
        aria-controls="navi"
        onClick={toggleNav}
        aria-expanded={open}
      >
        <span className={styles.line}></span>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
      </button>
    </nav>
  )
}

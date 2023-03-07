import Link from 'next/link'
import { useState } from 'react'
import styles from 'styles/nav.module.css'

export default function Nav(): JSX.Element {

  const [open, setOpen] = useState(false)

  return (
    <nav id="navi">
      <ul className={styles.list} aria-hidden={!open}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
      </ul>
      <button
        type="button"
        className={styles.burgerButton}
        aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
        aria-haspopup="true"
        aria-controls="navi"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className={styles.line}></span>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
      </button>
    </nav>
  )
}

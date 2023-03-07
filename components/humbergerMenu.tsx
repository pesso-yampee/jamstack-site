import { useState } from 'react'

import styles from 'styles/humbergerMenu.module.css'

export function HumbergerMenu(): JSX.Element {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        className={styles.flexContainer}
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
    </>
  )
}
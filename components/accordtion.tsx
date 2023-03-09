import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import styles from 'styles/accordion.module.css'

export default function Accordion() {
  const [open, setOpen] = useState(false)

  function toggleAccordion() {
    setOpen(!open)
  }

  return (
    <>
      <ul className={styles.list}>
        <li className={styles.item}>
          <button
            className={styles.button}
            aria-expanded={open}
            aria-controls="accordionPanel-1"
            id="accordionTab-1"
            onClick={toggleAccordion}
          >
            <span className={styles.title}>プログラミングのポイントについて</span>
            <FontAwesomeIcon
              className={styles.icon}
              icon={faCircleChevronDown}
              color="var(--gray-25)"
              width={20}
              height={20}
            />
          </button>
          <div
            className={styles.answer}
            id="accordionPanel-1"
            aria-hidden={!open}
            aria-labelledby="accordionPanel-1"
          >
            <div className={styles.answer_inner}>
              <p className={styles.answer_text}>
                プログラミングのポイントは、作りたいものを作ることです。楽しいことから思いつき、目標とゴールを決め、そこに向かってさまざまな課題を設定していきながら、プログラムを作っていきます。
              </p>
            </div>
          </div>
        </li>
      </ul>
    </>
  )
}

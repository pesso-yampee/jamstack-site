import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CSSProperties, ReactNode, useRef, useState } from 'react'
import styles from 'styles/accordion.module.css'

type Props = {
  heading: string
  children: ReactNode
}

export default function Accordion({ heading, children }: Props) {
  const [open, setOpen] = useState<boolean>(false)
  const refAnswer = useRef<HTMLDivElement>(null)
  const refAnswerStyle = {
    '--answer-text': `${
      refAnswer.current ? refAnswer.current.scrollHeight : 0
    }px`,
  } as CSSProperties

  function toggleAccordion() {
    setOpen(!open)
  }

  return (
    <div className={styles.item}>
      <h3 className={styles.heading}>
        <button
          className={styles.button}
          aria-expanded={open}
          aria-controls="accordionPanel-1"
          id="accordionTab-1"
          onClick={toggleAccordion}
        >
          <span className={styles.title}>{heading}</span>
          <FontAwesomeIcon
            className={styles.icon}
            icon={faCircleChevronDown}
            color="var(--gray-25)"
            width={20}
            height={20}
          />
        </button>
      </h3>
      <div
        className={styles.answer}
        id="accordionPanel-1"
        aria-hidden={!open}
        aria-labelledby="accordionPanel-1"
        ref={refAnswer}
        style={refAnswerStyle}
      >
        <div className={styles.answer_inner}>{children}</div>
      </div>
    </div>
  )
}

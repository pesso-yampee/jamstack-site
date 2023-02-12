import { ReactNode } from 'react'
import styles from 'styles/container.module.scss'

type Props = {
  large?: boolean
  children: ReactNode
}

export default function Container({ children, large = false }: Props) {
  return (
    <>
      <div className={large ? styles.large : styles.default}>{children}</div>
    </>
  )
}

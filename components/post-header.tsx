import { faClock } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ConvertDate from './convert-date'
import styles from 'styles/post-header.module.scss'

type Props = {
  title: string
  subtitle: string
  publish?: string
}

export default function PostHeader({ title, subtitle, publish = '' }: Props) {
  return (
    <>
      <div className={styles.stack}>
        <span className={styles.subtitle}>{subtitle}</span>
        <h1 className={styles.title}>{title}</h1>
        {publish && (
          <div className={styles.publish}>
            <FontAwesomeIcon icon={faClock} size="lg" color="var(--gray-25)" />
            <ConvertDate dateISO={publish} />
          </div>
        )}
      </div>
    </>
  )
}

import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import styles from 'styles/pagination.module.css'
type Props = {
  prevText: string | null
  prevUrl: string | null
  nextText: string | null
  nextUrl: string | null
}
export default function Pagination({
  prevText = '',
  prevUrl = '',
  nextText = '',
  nextUrl = '',
}: Props): JSX.Element {
  return (
    <ul className={styles.flexContainer}>
      <li className={styles.prev}>
        {prevText && prevUrl && (
          <Link href={prevUrl} className={styles.linkFeature}>
            <FontAwesomeIcon icon={faChevronLeft} color="var(--gray-25)" />
            {prevText}
          </Link>
        )}
      </li>
      <li className={styles.next}>
        {nextText && nextUrl && (
          <Link href={nextUrl} className={styles.linkFeature}>
            {nextText}
            <FontAwesomeIcon icon={faChevronRight} color="var(--gray-25)" />
          </Link>
        )}
      </li>
    </ul>
  )
}

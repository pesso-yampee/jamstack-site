import {
  faTwitter,
  faFacebookF,
  faGithub,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from 'styles/social.module.scss'

type Props = {
  iconSize: string
}

export default function Social ({iconSize="initial"} :Props) {
  return (
    <>
      <ul className={styles.list} style={{fontSize: iconSize}}>
        <li>
          <FontAwesomeIcon icon={faTwitter} />
          <span className="sr-only">Twitter</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faFacebookF} />
          <span className="sr-only">Facebook</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faGithub} />
          <span className="sr-only">Github</span>
        </li>
      </ul>
    </>
  )
}
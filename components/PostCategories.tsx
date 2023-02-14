import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons'
import styles from 'styles/post-categories.module.scss'
import Link from 'next/link'

interface C {
  name: string
  slug: string
}

type Props = {
  categories: Array<C>
}

type Category = {
  name: string
  slug: string
}

export default function PostCategories({categories}: Props) {
  return (
    <>
      <FontAwesomeIcon icon={faFolderOpen} color="var(--gray-50)" size="lg" />
      <ul className={styles.list}>
        {categories.map(({ name, slug }: Category) => {})}
        {/* // <li key={slug}>
        //   <Link href={`/blog/category/${slug}`}>
        //     <a>{name}</a>
        //   </Link>
        // </li> */}
      </ul>
    </>
  )
}
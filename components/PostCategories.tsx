import Meta from 'components/meta'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons'
import styles from 'styles/post-categories.module.scss'
import Link from 'next/link'

type Category = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  name: string
  slug: string
}

type CategoryItem = {
  id: string
  name: string
  slug: string
}

type Props = {
  categories: Category[]
}

export default function PostCategories({ categories }: Props) {
  return (
    <div className={styles.flexContainer}>
      <h3 className={styles.heading}>
        <FontAwesomeIcon icon={faFolderOpen} color="var(--gray-50)" size="lg" />
        <span className="sr-only">Categories</span>
      </h3>
      <ul className={styles.list}>
        {categories.map(({ id, name, slug }: CategoryItem) => (
          <li key={id}>
            <Link href={`/blog/category/${slug}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

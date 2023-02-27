import Image from 'next/image'
import Link from 'next/link'
import { eyeCatchLocal } from './constants'
import styles from 'style/posts.module.css'

type Contents = {
  title: string
  slug: string
  id: string
  eyecatch: {
    url: string
    height: number
    width: number
  }
}

type AllCategories = Contents[]

export function Posts(categories: AllCategories) {
  return (
    <>
      <ul className={styles.gridContainer}>
        {categories.map(({ title, slug, id, eyecatch }) => (
          <li key={id}>
            <Link href={`/blog/${slug}`}>
              <figure>
                <Image
                  src={eyecatch.url ?? eyeCatchLocal.url}
                  alt=""
                  width={eyecatch.width ?? eyeCatchLocal.width}
                  height={eyecatch.height ?? eyeCatchLocal.height}
                  sizes="(min-width: 768px) 546px, 100vw"
                  placeholder="blur"
                />
              </figure>
              <h3>{title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

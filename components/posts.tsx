import Image from 'next/image'
import Link from 'next/link'
import styles from 'styles/posts.module.css'

type Props = {
  posts: PostsProps[]
}

interface PostsProps {
  title: string
  slug: string
  id: string
  eyecatch: PostEyecatch
}

interface PostEyecatch {
  url: string
  width: number
  height: number
  blurDataURL: string
}

export function Posts({ posts }: Props) {
  return (
    <>
      <ul className={styles.flexContainer}>
        {posts.map(({title,slug,id,eyecatch}) => (
          <li className={styles.eachPost} key={id}>
            <Link href={`/blog/${slug}`}>
              {eyecatch && (
                <figure>
                  <Image
                    className={styles.image}
                    src={eyecatch.url}
                    alt=""
                    fill
                    sizes="(min-width: 1152px) 100%, 50vw"
                    placeholder="blur"
                    blurDataURL={eyecatch.blurDataURL}
                  />
                </figure>
              )}
              <h2 className={styles.title}>{title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

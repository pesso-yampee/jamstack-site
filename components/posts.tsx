import Image from 'next/image'
import Link from 'next/link'
import styles from 'styles/posts.module.css'

type Props = {
  posts: PostsProps[]
}

type PostsProps = {
  title: string
  slug: string
  id: string
  eyecatch: {
    url: string
    width: number
    height: number
    blurDataURL: string
  }
}

export default function Posts({ posts }: Props) {
  return (
    <>
      <div className={styles.gridContainer}>
        {posts.map(({ title, slug, id, eyecatch }) => (
          <article className={styles.eachPost} key={id}>
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
          </article>
        ))}
      </div>
    </>
  )
}

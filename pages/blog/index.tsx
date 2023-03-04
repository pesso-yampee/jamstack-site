import { getAllPosts } from 'lib/api'
import Container from 'components/container'
import { eyeCatchLocal } from 'components/constants'
import { getPlaiceholder } from 'plaiceholder'
import Hero from 'components/hero'
import Meta from 'components/meta'
import { Posts } from 'components/posts'

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

export default function Blog({ posts }: Props) {
  const heroProps = { title: 'Blog', subtitle: 'Recent Posts', imageOn: false }
  const metaProps = {
    pageTitle: 'Blog',
    pageDesc: 'ブログの記事一覧',
  }
  return (
    <>
      <Container>
        <Meta {...metaProps}></Meta>
        <Hero {...heroProps} />
        <Posts posts={posts} />
      </Container>
    </>
  )
}

type Posts = {
  title: string
  slug: string
  id: string
  eyecatch: {
    url: string
    width: number
    height: number
    blurDataURL?: string
  }
}

type AllPosts = Posts[]

// export async function getStaticPaths() {
//   const categories: AllCategories = await getAllPosts()
//   return {
//     paths: categories.map(({ slug }) => `/blog/${slug}`),
//     fallback: false,
//   }
// }

// type Context = {
//   params: {
//     slug: string
//   }
// }

export async function getStaticProps() {
  const posts: AllPosts = await getAllPosts()
  for (const post of posts) {
    if (!post.hasOwnProperty('eyecatch')) post.eyecatch = eyeCatchLocal
    const { base64 } = await getPlaiceholder(post.eyecatch.url)
    post.eyecatch.blurDataURL = base64
  }
  return {
    props: {
      posts: posts,
    },
  }
}

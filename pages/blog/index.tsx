import { getPlaiceholder } from 'plaiceholder'
import { eyeCatchLocal } from 'components/constants'
import Container from 'components/container'
import Hero from 'components/hero'
import Meta from 'components/meta'
import { Posts } from 'components/posts'
import { getAllPosts } from 'lib/api'

type Props = {
  posts: PostsProps[]
}

type PostsProps = {
  title: string
  slug: string
  id: string
  eyecatch: PostEyecatch
}

type PostEyecatch = {
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

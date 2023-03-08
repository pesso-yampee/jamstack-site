import Container from 'components/container'
import Hero from 'components/hero'
import Meta from 'components/meta'
import Posts from 'components/posts'
import { eyeCatchLocal } from 'components/constants'
import Pagination from 'components/pagination'
import { getAllPosts } from 'lib/api'
import { getPlaiceholder } from 'plaiceholder'
import cube from '/assets/media/images/cube.png'

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

export default function Home({ posts }: Props) {
  const metaProps = {
    pageImg: cube.src,
    pageImgW: cube.width,
    pageImgH: cube.height,
  }

  const heroProps = {
    title: 'CUBE',
    subtitle: 'アウトプットしていくサイト',
    imageOn: true,
  }

  return (
    <>
      <Container>
        <Meta {...metaProps}></Meta>
        <Hero {...heroProps} />
        <Posts posts={posts}></Posts>
        <Pagination prevUrl="" prevText="" nextUrl="/blog/" nextText="More Posts"></Pagination>
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
  const limit: number = 4
  const posts: AllPosts = await getAllPosts(limit)
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

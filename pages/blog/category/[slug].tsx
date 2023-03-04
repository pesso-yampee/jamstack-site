import { getAllCategories, getAllPostsByCategory } from 'lib/api'
import { Posts } from 'components/posts'
import PostHeader from 'components/post-header'
import { eyeCatchLocal } from 'components/constants'
import Container from 'components/container'
import { getPlaiceholder } from 'plaiceholder'

type Props = {
  name: string
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

export default function Category({ name, posts }: Props) {
  return (
    <>
      <Container>
        <PostHeader title={name} subtitle="Blog Category"></PostHeader>
        <Posts posts={posts} />
      </Container>
    </>
  )
}

type Contents = {
  name: string
  slug: string
  id: string
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

type AllCategories = Contents[]
type AllPosts = Posts[]

export async function getStaticPaths() {
  const categories: AllCategories = await getAllCategories()
  return {
    paths: categories.map(({ slug }) => `/blog/category/${slug}`),
    fallback: false,
  }
}

type Context = {
  params: {
    slug: string
  }
}

export async function getStaticProps(context: Context) {
  const catSlug: string = context.params.slug
  const categories: AllCategories = await getAllCategories()
  const cat: Contents | undefined = categories.find(
    ({ slug }) => slug === catSlug,
  )
  const catId: string = typeof cat != 'undefined' ? cat.id : ''
  const posts: AllPosts = await getAllPostsByCategory(catId)
  for (const post of posts) {
    if (!post.hasOwnProperty('eyecatch')) post.eyecatch = eyeCatchLocal
    const { base64 } = await getPlaiceholder(post.eyecatch.url)
    post.eyecatch.blurDataURL = base64
  }
  return {
    props: {
      name: cat?.name,
      posts: posts,
    },
  }
}

import { getAllCategories, getPostBySlug } from 'lib/api'
import { Posts } from 'components/posts'
import styles from 'style/category.module.css'
import PostHeader from 'components/post-header'

type Props = {
  name :string
}

export default function Category({ name }: Props) {
  return <PostHeader title={name} subtitle="Blog Category"></PostHeader>
}

type Contents = {
  name: string
  slug: string
  id: string
}

type AllCategories = Contents[]

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
  const cat: Contents | undefined = categories.find(({ slug }) => slug === catSlug)
  const post = await getPostBySlug(catSlug)
  return {
    props: {
      name: cat?.name,
    },
  }
}

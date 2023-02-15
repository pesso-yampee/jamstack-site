import { client } from 'lib/api'
import { isReturnStatement } from 'typescript'
import { getPostBySlug } from 'lib/api'
import Container from 'components/container'
import Image from 'next/image'
import PostHeader from 'components/post-header'
import PostBody from 'components/post-body'
import ConvertBody from 'components/CovertBody'
import {
  TwoColumn,
  TwoColumnMain,
  TwoColumnSidebar,
} from 'components/two-column'
import PostCategories from 'components/PostCategories'

type Category = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  name: string
  slug: string
}

type Props = {
  title: string
  subtitle: string
  publish: string
  eyecatch: {
    url: string
    height: number
    width: number
  }
  lead: {
    value: string
  }
  section: {
    heading: string
    text01: string
    image: {
      url: string
      width: number
      height: number
    }
    text02: string
  }
  categories: Category[]
}

export default function Schedule({
  title,
  subtitle,
  publish,
  lead,
  section,
  eyecatch,
  categories,
}: Props) {
  const image = section.image
  return (
    <>
      <Container>
        <article>
          <PostHeader title={title} subtitle="Blog Article" publish={publish} />
          <figure>
            <Image
              src={eyecatch.url}
              alt=""
              sizes="(min-width: 1152px) 1152px, 100vw"
              width={eyecatch.width}
              height={eyecatch.height}
              style={{ width: '100%', height: 'auto' }}
              priority
            />
          </figure>
          <TwoColumn>
            <TwoColumnMain>
              <PostBody>
                <p>{lead.value}</p>
                <h2>{section.heading}</h2>
                <p>{section.text01}</p>
                <figure>
                  <Image
                    src={image.url}
                    alt=""
                    width={image.width}
                    height={image.height}
                    sizes="(min-width: 768px) 768px, 100vw"
                  />
                </figure>
                <p>{section.text02}</p>
              </PostBody>
            </TwoColumnMain>
            <TwoColumnSidebar>
              <PostCategories categories={categories} />
            </TwoColumnSidebar>
          </TwoColumn>
        </article>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const slug = 'schedule'
  const post = await getPostBySlug(slug)

  return {
    props: {
      title: post.title,
      subtitle: post.subtitle,
      publish: post.publishDate,
      eyecatch: post.eyecatch,
      lead: post.lead,
      section: post.section,
      categories: post.categories,
    },
  }
}

import { client } from 'lib/api'
import { isReturnStatement } from 'typescript'
import { getPostBySlug } from 'lib/api'
import Meta from 'components/meta'
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
import extractText from 'components/extract-text'
import { eyeCatchLocal } from 'components/constants'
import { getPlaiceholder } from 'plaiceholder'

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
    blurDataURL: string
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
  description: string
}

export default function Post({
  title,
  subtitle,
  publish,
  lead,
  section,
  eyecatch,
  categories,
  description,
}: Props) {
  const image = section.image
  return (
    <>
      <Meta
        pageTitle={title}
        pageDesc={description}
        pageImg={eyecatch.url}
        pageImgW={eyecatch.width}
        pageImgH={eyecatch.height}
      ></Meta>
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
                    placeholder="blur"
                    blurDataURL={eyecatch.blurDataURL}
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

type Slug = {
  name: string
}
export async function getStaticPaths(slug: Slug) {
  return {
    paths: ['/blog/schedule', 'blog/finish', 'blog/history'],
    fallback: false,
  }
}

interface Context {
  params: {
    slug: string
  }
}

type ContextProps = {
  context: {
    params: {
      slug: string
    }
  }
}

export async function getStaticProps(context) {
  const slug: string = context.params.slug
  const post = await getPostBySlug(slug)
  // 単純にpost.section.text01だとundefindになる。
  const description: string = extractText(`${post.section.text01}`)
  const eyecatch = post.eyecatch ?? eyeCatchLocal
  const { base64 } = await getPlaiceholder(eyecatch.url)
  eyecatch.blurDataURL = base64

  return {
    props: {
      title: post.title,
      subtitle: post.subtitle,
      publish: post.publishDate,
      eyecatch: eyecatch,
      lead: post.lead,
      section: post.section,
      categories: post.categories,
      description: description,
    },
  }
}

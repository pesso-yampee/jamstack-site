import Image from 'next/image'
import { getPlaiceholder } from 'plaiceholder'
import ConvertBody from 'components/CovertBody'
import PostCategories from 'components/PostCategories'
import { eyeCatchLocal } from 'components/constants'
import Container from 'components/container'
import extractText from 'components/extract-text'
import Meta from 'components/meta'
import Pagination from 'components/pagination'
import PostBody from 'components/post-body'
import PostHeader from 'components/post-header'
import {
  TwoColumn,
  TwoColumnMain,
  TwoColumnSidebar,
} from 'components/two-column'
import { getPostBySlug, getAllSlugs } from 'lib/api'
import { PrevNextPost } from 'lib/prev-next-post'

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
  prevPost: Contents
  nextPost: Contents
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
  prevPost,
  nextPost,
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
        <article style={{ paddingBottom: 'var(--space-lg)' }}>
          <PostHeader title={title} subtitle="Blog Article" publish={publish} />
          <figure>
            <Image
              key={eyecatch.url}
              src={eyecatch.url}
              alt=""
              sizes="(min-width: 1152px) 1152px, 100vw"
              width={eyecatch.width}
              height={eyecatch.height}
              style={{ width: '100%', height: 'auto' }}
              priority
              placeholder="blur"
              blurDataURL={eyecatch.blurDataURL}
            />
          </figure>
          <TwoColumn>
            <TwoColumnMain>
              <PostBody>
                <p>{lead.value}</p>
                <h2>{section.heading}</h2>
                <p>{section.text01}</p>
                {image && (
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
                )}
                <p>{section.text02}</p>
              </PostBody>
            </TwoColumnMain>
            <TwoColumnSidebar>
              <PostCategories categories={categories} />
            </TwoColumnSidebar>
          </TwoColumn>
          <Pagination
            prevText={prevPost && prevPost.title}
            prevUrl={prevPost && `/blog/${prevPost.slug}`}
            nextText={nextPost && nextPost.title}
            nextUrl={nextPost && `/blog/${nextPost.slug}`}
          />
        </article>
      </Container>
    </>
  )
}

type Contents = {
  title: string
  slug: string
}

type AllSlugs = Contents[]

export async function getStaticPaths() {
  const allSlugs: AllSlugs = await getAllSlugs()
  return {
    paths: allSlugs.map(({ slug }) => `/blog/${slug}`),
    fallback: false,
  }
}

type ContextProps = {
  params: {
    slug: string
  }
}

export async function getStaticProps(context: ContextProps) {
  const slug: string = context.params.slug
  const post = await getPostBySlug(slug)
  // TODO: 単純にpost.section.text01だとundefindになる。
  const description: string = extractText(`${post.section.text01}`)
  const eyecatch = post.eyecatch ?? eyeCatchLocal
  const { base64 } = await getPlaiceholder(eyecatch.url)
  eyecatch.blurDataURL = base64
  const allSlugs = await getAllSlugs()

  const [prevPost, nextPost] = PrevNextPost(allSlugs, slug)

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
      prevPost: prevPost,
      nextPost: nextPost,
    },
  }
}

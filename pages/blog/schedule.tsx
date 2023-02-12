import { client } from 'lib/api'
import { isReturnStatement } from 'typescript'
import { getPostBySlug } from 'lib/api'
import Container from 'components/container'
import Image from 'next/image'
import PostHeader from 'components/post-header'
import PostBody from 'components/post-body'
import ConvertBody from 'components/CovertBody'
import { TwoColumn, TwoColumnMain, TwoColumnSidebar } from 'components/two-column'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons'

type Props = {
  title: string
  subtitle: string
  publish: string
  content: string
  eyecatch: {
    url: string
    height: number
    width: number
  }
  categories: {
    id: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    revisedAt: string
    name: string
  }
}

export default function Schedule({
  title,
  subtitle,
  publish,
  content,
  eyecatch,
  categories,
}: Props) {
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
          <PostBody>
            <TwoColumn>
              <TwoColumnMain>
                <ConvertBody contentHTML={content} />
              </TwoColumnMain>
              <TwoColumnSidebar>
                <FontAwesomeIcon
                  icon={faFolderOpen}
                  color="var(--gray-50)"
                  size="lg"
                />
                <a href="#">{categories.name}</a>
              </TwoColumnSidebar>
            </TwoColumn>
          </PostBody>
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
      content: post.content,
      eyecatch: post.eyecatch,
      categories: post.categories,
    },
  }
}

import Container from 'components/container'
import Hero from 'components/hero'
import Meta from 'components/meta'

export default function Blog() {
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
      </Container>
    </>
  )
}

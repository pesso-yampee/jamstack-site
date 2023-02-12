import Container from 'components/container'
import Hero from 'components/hero'
import Meta from 'components/meta'
import cube from "/assets/media/images/cube.png";

export default function Home() {
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
      </Container>
    </>
  )
}

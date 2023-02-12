import HTMLReactParser from 'html-react-parser'
import parse, { Element } from 'html-react-parser'
import Image from 'next/image'

type Props = {
  contentHTML: string
}

export default function ConvertBody({ contentHTML }: Props) {
  const contentReact = parse(contentHTML, {
    replace: (node) => {
      if (node instanceof Element && node.name === "img") {
        console.log(node.attributes);
        // const { node.attributes.src, node.attributes.alt, width, height } = node.attributes
        // return (
        //   <Image
        //     src={src}
        //     alt={alt}
        //     width={width}
        //     height={height}
        //     sizes="(min-width: 768px) 768px, 100vw"
        //   />
        // )
      }
    },
  })
  return <>{contentReact}</>
}

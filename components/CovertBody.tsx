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
        const src = node.attributes[0].value
        const alt = node.attributes[1].value
        const width = Number(node.attributes[2].value)
        const height = Number(node.attributes[3].value)
        return (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="(min-width: 768px) 768px, 100vw"
          />
        )
      }
    },
  })
  return <>{contentReact}</>
}

import Image from 'next/image'
import styles from '/styles/hero.module.css'
import cube from '/assets/media/images/cube.png'

type Props = {
  title: string
  subtitle: string
  imageOn: boolean
}

export default function Hero({
  title,
  subtitle,
  imageOn = false,
}: Props): JSX.Element {
  return (
    <>
      <div className={styles.flexContainer}>
        <div className={styles.text}>
          <h1 className={styles.title}>{title}</h1>
          <span className={styles.subtitle}>{subtitle}</span>
        </div>
        {imageOn && (
          <figure className={styles.image}>
            <Image
              src={cube}
              alt=""
              sizes="(min-width: 1152px) 575px, (min-width: 768px) 50vw, 100vw"
              priority
              placeholder="blur"
            />
          </figure>
        )}
      </div>
    </>
  )
}

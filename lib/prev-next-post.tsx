type Contents = {
  title: string
  slug: string
}

type AllSlugs = Contents[]

export function PrevNextPost(allSlugs: AllSlugs, currentSlug: string) {
  const length: number = allSlugs.length
  const currentSlugIndex = allSlugs.findIndex(({slug}) => {
    return slug === currentSlug
  })
  const prevPost: any =
    currentSlugIndex + 1 === length ? null : allSlugs[currentSlugIndex - 1]
  const nextPost: any =
    currentSlugIndex - 1 === 0 ? null : allSlugs[currentSlugIndex + 1]

  return [prevPost, nextPost]
}

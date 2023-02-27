import { createClient } from 'microcms-js-sdk'

export const client = createClient({
  serviceDomain: `${process.env.SERVICE_DOMAIN}`,
  apiKey: `${process.env.API_KEY}`,
})

export async function getPostBySlug(slug: string) {
  try {
    const post = await client.get({
      endpoint: 'blogs',
      queries: { filters: `slug[equals]${slug}` },
    })
    return post.contents[0]
  } catch (err) {
    console.log('~~ getPostBySlug ~~')
    console.log(err)
  }
}

export async function getAllSlugs(limit = 100) {
  try {
    const slugs = await client.get({
      endpoint: 'blogs',
      queries: { fields: 'title,slug', orders: '-publishDate', limit: limit },
    })
    return slugs.contents
  } catch (err) {
    console.log('~~ getAllSlugs ~~')
    console.log(getAllSlugs)
  }
}

export async function getAllCategories(limit = 100) {
  try {
    const categories = await client.get({
      endpoint: 'categories',
      queries: { fields: 'name,slug,id', limit: limit },
    })
    return categories.contents
  } catch (error) {
    console.log('~getAllCategories~')
    console.log(error)
  }
}

export async function getAllPostsByCategory(catID, limit = 100) {
}
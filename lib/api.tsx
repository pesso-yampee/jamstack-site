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

export async function getAllPosts(limit = 100) {
  try {
    const allPosts = await client.get({
      endpoint: 'blogs',
      queries: { fields: 'id,title,slug,eyecatch' },
    })
    return allPosts.contents
  } catch (error) {
    console.log('~getAllPosts~')
    console.log(error)
  }
}

export async function getAllPostsByCategory(catID: string, limit = 100) {
  // 空文字だったらエラーを出した上で返却する
  if (catID === '') {
    throw new Error('catID is empty string')
  }
  try {
    const posts = await client.get({
      endpoint: 'blogs',
      queries: {
        filters: `categories[contains]${catID}`,
        fields: 'title,slug,eyecatch,id',
        orders: '-publishDate',
        limit: limit,
      },
    })
    return posts.contents
  } catch (err) {
    console.log('~getAllPostsByCategory~')
    console.log(err)
  }
}

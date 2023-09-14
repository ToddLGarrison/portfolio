import { parse } from 'rss-to-json'

const loadPosts = async () => {
  const rss = await parse('https://medium.com/feed/@jtonti')
  return JSON.stringify(rss, null, 3)
}

export default loadPosts

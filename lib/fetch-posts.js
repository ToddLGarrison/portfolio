import { parse } from 'rss-to-json'

const loadPosts = async () => {
  const rss = await parse('https://github.com/ToddLGarrison?tab=repositories')
  return JSON.stringify(rss, null, 3)
}

export default loadPosts

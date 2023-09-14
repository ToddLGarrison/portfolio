import nc from 'next-connect'
const { parse } = require('rss-to-json')

const handler = nc().get(async (req, res) => {
  const rss = await parse('https://medium.com/feed/@jtonti')
  res.send(JSON.stringify(rss, null, 3))
  console.log('this running?')
  // console.log(JSON.stringify(rss, null, 3))
})

export default handler

/*
export default (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  const rss = await parse('https://medium.com/feed/@jtonti')

  console.log(JSON.stringify(rss, null, 3))
  res.end(JSON.stringify({ message: 'yo yo' }))
}
*/

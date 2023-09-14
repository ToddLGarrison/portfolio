import Layout from '../src/components/Layout'
import NestedLayout from '../src/components/nested-layout'
import loadPosts from '../lib/fetch-posts'
import AppPostList from '../src/components/AppPostList'
import AppCommitFeed from '../src/components/AppCommitFeed'
import { ReactElement } from 'react'

type IndexPageProps = {
  thoughts: object[]
  commits: object[]
}

export default function Page({ thoughts, commits }: IndexPageProps) {
  return (
    <div className="py-20 font-raleway">
      <h1 className="mb-4 font-raleway text-[36px] font-bold">
        Hello, my name is Todd.
      </h1>
      <p className="mb-24 text-2xl text-gray-600 font-libre">
      Experienced Customer Success Manager and Entrepreneur with over a decade of customer-facing expertise, 
      eager to transition into Software Engineering. 
      
      I learned how to build and ship full-stack software via an immersive training program at Launch Academy 
      and have continued to hone new skills through personal projects. 
      
      My career journey has nurtured my adaptability, problem-solving prowess, and customer-centric focus, 
      which I use to drive innovation and deliver results in forward-thinking projects 
      while remaining committed to continuous learning.
      </p>

      <h2 className="mb-10 text-sm font-bold uppercase text-sky-800">
        Projects
      </h2>
      {/* <AppPostList items={thoughts} /> */}
      {/* <a href={'/thoughts'} className="font-medium text-gray-600">
          More
          <span className="pl-2">→</span>
        </className=>
      </a> */}
      <h2 className="my-10 text-sm font-bold uppercase text-sky-800">
        recent commits
      </h2>
      <AppCommitFeed commits={commits} />
      <a href="/work" className="font-medium text-gray-600">
        More
        <span className="pl-2">→</span>
      </a>
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  )
}

export async function getStaticProps() {
  // get medium posts
  const data = await loadPosts()
  const items = JSON.parse(data).items.map(
    (item: { title: string; link: string; published: Date }) => {
      return {
        title: item.title,
        link: item.link,
        published: item.published,
        // content: item.content,
      }
    }
  )

  //get git commits
  const res = await fetch(
    'https://api.github.com/users/ToddLGarrison/events/public'
  )
  const gitData = await res.json()

  const commits = gitData.map(
    (c: {
      type: any
      repo: { name: string }
      payload: { commits: any }
      created_at: any
    }) => {
      return {
        type: c.type,
        repo: c.repo.name.split('/').pop(),
        commits: c.payload.commits || [],
        created: c.created_at,
      }
    }
  )

  return {
    props: { thoughts: items.slice(0, 3), commits: commits.slice(0, 3) },
  }
}

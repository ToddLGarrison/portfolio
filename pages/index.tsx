import Layout from '../src/components/Layout'
import NestedLayout from '../src/components/nested-layout'
import loadPosts from '../lib/fetch-posts'
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
      <div className="mb-24 text-2xl text-gray-600 font-libre">
        <p className='about-paragraph'>
        Software Engineer with hands-on experience in building and shipping full-stack software, 
        coming from a background in Customer Success Management and Entrepreneurship with over a decade of 
        customer-facing expertise. 
        </p>
        <p className='about-paragraph'>
        I studied full-stack software development through an immersive training program at Launch Academy 
        and have continued to refine my skills through personal projects. Leveraging my adaptability, 
        problem-solving prowess, and customer-centric focus, I drive innovation and deliver results in forward-thinking projects. 
        </p>
      </div>
      
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
    props: { commits: commits.slice(0, 3) },
  }
}

import Layout from '../src/components/Layout'
import NestedLayout from '../src/components/nested-layout'
import loadPosts from '../lib/fetch-posts'
import AppPostList from '../src/components/AppPostList'
import Link from 'next/link'
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
        Hello, my name is Jon.
      </h1>
      <p className="mb-24 text-2xl text-gray-600 font-libre">
        I am a Software Engineer based in Salinas, CA. Currently I'm working at
        Oiga Technologies.
      </p>
      <h2 className="mb-10 text-sm font-bold uppercase text-sky-800">
        recent thoughts
      </h2>
      <AppPostList items={thoughts} />
      <Link href={'/thoughts'}>
        <a className="font-medium text-gray-600">
          More
          <span className="pl-2">→</span>
        </a>
      </Link>
      <h2 className="my-10 text-sm font-bold uppercase text-sky-800">
        recent commits
      </h2>
      <AppCommitFeed commits={commits} />
      <Link href={'/work'}>
        <a className="font-medium text-gray-600">
          More
          <span className="pl-2">→</span>
        </a>
      </Link>
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
    'https://api.github.com/users/jtontiwith/events/public'
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

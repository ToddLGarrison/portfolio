import Layout from '../src/components/Layout'
import loadPosts from '../lib/fetch-posts'
import AppPostList from '../src/components/AppPostList'
import NestedLayout from '../src/components/nested-layout'
import { ReactElement } from 'react'

type ThoughtsPageProps = {
  thoughts: object[]
}

const Thoughts = ({ thoughts }: ThoughtsPageProps) => {
  return (
    <div className="pt-20 font-raleway">
      <h1 className="mb-4 font-raleway text-[36px] font-bold">Thoughts</h1>
      <p className="mb-24 text-2xl text-gray-600 font-libre">
        Learnings and other miscellaneous musings.
      </p>
      <AppPostList items={thoughts} />
    </div>
  )
}

export default Thoughts

Thoughts.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await loadPosts()

  const items = JSON.parse(data).items.map(
    (item: { title: any; link: any; published: any }) => {
      return {
        title: item.title,
        link: item.link,
        published: item.published,
        // content: item.content,
      }
    }
  )

  return {
    props: { thoughts: items },
  }
}

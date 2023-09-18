import Layout from '../src/components/Layout'
import loadPosts from '../lib/fetch-posts'
// import AppPostList from '../src/components/AppPostList'
import NestedLayout from '../src/components/nested-layout'
import { ReactElement } from 'react'

type ProjectsPageProps = {
  projects: object[]
}

const Projects = ({ projects }: ProjectsPageProps) => {
  return (
    <div className="pt-20 font-raleway">
      <h1 className="mb-4 font-raleway text-[36px] font-bold">Projects</h1>
      <p className="mb-24 text-2xl text-gray-600 font-libre">
        Coming soon!
      </p>
      <p className="mb-24 text-2xl text-gray-600 font-libre">
        Things I am currently working on and ideas upcoming projects.
      </p>
      {/* <AppPostList items={Projects} /> */}
    </div>
  )
}

export default Projects

Projects.getLayout = function getLayout(page: ReactElement) {
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
    props: { projects: items },
  }
}

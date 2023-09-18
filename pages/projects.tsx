import Layout from '../src/components/Layout'
import AppWebsiteDisplayer from '../src/components/AppWebSiteDisplayer'
import AppCommitFeed from '../src/components/AppCommitFeed'
import ProjectsLayout from '../src/components/projects-layout'
import { ReactElement } from 'react'

type ProjectsPageProps = {
  commits: object[]
}

const Projects = ({ commits }: ProjectsPageProps) => {
  const myProjects = [
    {
      site: 'https://sea-to-see.herokuapp.com/',
      repo: 'https://github.com/ToddLGarrison/sea-to-see',
    },
    {
      site: 'https://www.toddlgarrison.com/',
      repo: 'https://github.com/ToddLGarrison/portfolio',
    },
  ]
  const projectsArr = myProjects.map((p) => (
    <AppWebsiteDisplayer siteUrl={p.site} repoUrl={p.repo} />
  ))

  return (
    <div className="pt-20 font-raleway">
      <div className='pl-12'>
        <h1 className="mb-4 font-raleway text-[36px] font-bold">Projects</h1>
        <p className="mb-24 text-2xl text-gray-600 font-libre">
          Things I am currently working on and ideas upcoming projects.
        </p>
      </div>

      <div className="grid justify-items-center gap-y-12 lg:grid-cols-2">
        {projectsArr}
      </div>
      <div className="mt-12 lg:mx-11">
        <h2 className="mb-10 text-sm font-bold uppercase text-sky-800">
          recent commits
        </h2>
        <AppCommitFeed commits={commits} />
      </div>
    </div>
  )
}

export default Projects

Projects.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <ProjectsLayout>{page}</ProjectsLayout>
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(
    'https://api.github.com/users/ToddLGarrison/events/public'
  )
  const data = await res.json()
  console.log('checking types here ', data.length)
  const commits = data.map(
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
    props: { commits: commits.slice(0, 5) },
  }
}
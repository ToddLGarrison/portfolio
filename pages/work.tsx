import Layout from '../src/components/Layout'
import WorkLayout from '../src/components/work-layout'
import AppWebsiteDisplayer from '../src/components/AppWebSiteDisplayer'
import AppCommitFeed from '../src/components/AppCommitFeed'
import { ReactElement } from 'react'

type WorkPageProps = {
  commits: object[]
}

const Work = ({ commits }: WorkPageProps) => {
  const projects = [
    {
      site: 'https://losyarumos.com/treehouse/',
      repo: 'https://github.com/jtontiwith/los-yarumos',
    },
    {
      site: 'https://redeslibertad.com/',
      repo: 'https://github.com/jtontiwith/freedom-networks',
    },
    {
      site: 'https://jontonti.com',
      repo: 'https://github.com/jtontiwith/personal-portfolio',
    },
  ]
  const projectsArr = projects.map((p) => (
    <AppWebsiteDisplayer siteUrl={p.site} repoUrl={p.repo} />
  ))

  return (
    <div className="pt-20 font-raleway">
      <div className="pl-12">
        <h1 className="mb-4 font-raleway text-[36px] font-bold">Work</h1>
        <p className="mb-24 text-2xl text-gray-600 font-libre">
          Some non-client work I can share.
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

export default Work

Work.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <WorkLayout>{page}</WorkLayout>
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(
    'https://api.github.com/users/jtontiwith/events/public'
  )
  const data = await res.json()
  console.log('checkin types here ', data.length)
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
    props: { commits },
  }
}

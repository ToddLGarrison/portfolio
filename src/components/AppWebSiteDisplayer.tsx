import { useState } from 'react'
import { spawn } from 'child_process'

type WebSiteDisplayerProps = {
  siteUrl: string
  repoUrl: string
}

const AppWebSiteDisplayer = (props: WebSiteDisplayerProps) => {
  const [hover, setHover] = useState(false)

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="h-60 w-96"
    >
      <div
        className={
          'mr-8 pb-2 text-right text-xs font-bold uppercase text-sky-800 ' +
          (hover ? 'visible' : 'invisible')
        }
      >
        <a target="_blank" href={props.siteUrl}>
          site
        </a>{' '}
        |{' '}
        <a target="_blank" href={props.repoUrl}>
          repo
        </a>
      </div>
      <iframe
        scrolling="no"
        className="pointer-events-none h-[56rem] w-[90rem] origin-[0_0] scale-[.25] shadow-2xl"
        src={props.siteUrl}
      ></iframe>
    </div>
  )
}

export default AppWebSiteDisplayer

type CommitFeedProps = {
  commits: Array<any>
}

const transformDate = (isoDate: String) => {
  const dArr = isoDate.split('T')[0].split('-')
  return dArr[1] + '-' + dArr[2] + '-' + dArr[0]
}

const AppCommitFeed = ({ commits }: CommitFeedProps) => {
  const commitEls = commits.map((c, i) => {
    return (
      <div className="pt-2 mb-6 border-t border-gray-200" key={i}>
        <div>{c.type}</div>
        <div>{c.repo}</div>
        <div>{transformDate(c.created)}</div>
        <div>{c.commits.map((c: { message: any }) => c.message)}</div>
      </div>
    )
  })
  return <>{commitEls}</>
}

export default AppCommitFeed

// https://stackoverflow.com/questions/21869795/github-api-retrieve-user-commits

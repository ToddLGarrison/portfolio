type PostListProps = {
  items: Array<any>
}

const formatDate = (unixDate: Date) => {
  const d = new Date(unixDate)
  return d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear()
}

const AppPostList = ({ items }: PostListProps) => {
  const els = items.map((item) => {
    return (
      <li className="mb-8">
        <a href={item.link} target="_blank">
          <time className="text-gray-600 text-md font-libre">
            {formatDate(item.published)}
          </time>
          <div className="text-3xl font-bold">{item.title}</div>
        </a>
      </li>
    )
  })
  return <ul>{els}</ul>
}

export default AppPostList

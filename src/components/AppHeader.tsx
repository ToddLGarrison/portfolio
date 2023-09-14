import Link from 'next/link'
import AppNav from './AppNav'

const AppHeader = () => {
  return (
    <header className="flex justify-between py-2 pt-4 text-sm font-bold uppercase">
      <Link href="/">
        <a>
          <div className="flex items-center text-base uppercase">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
            <div className="ml-4 uppercase">Jon Tonti</div>
          </div>
        </a>
      </Link>
      <AppNav />
    </header>
  )
}

export default AppHeader

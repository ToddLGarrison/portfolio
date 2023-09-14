import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const AppNav = () => {
  const { pathname } = useRouter()
  const dot = <div>&#8226;</div>
  const [mobileMenu, setMobileMenu] = useState(false)

  const links = [
    { name: 'home', path: '/' },
    { name: 'thoughts', path: '/thoughts' },
    { name: 'work', path: '/work' },
  ].map((l, i) => {
    return (
      <div
        className="flex flex-col mr-0 text-sm font-bold text-right uppercase md:mr-10 md:text-center"
        key={i}
      >
        <Link href={l.path}>
          <a>{l.name}</a>
        </Link>
        <span className="hidden md:block">{pathname === l.path && dot}</span>
      </div>
    )
  })

  const mobileIcon = (
    <div>
      {!mobileMenu ? (
        <svg
          onClick={() => setMobileMenu(true)}
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      ) : (
        <svg
          onClick={() => setMobileMenu(false)}
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
    </div>
  )

  useEffect(() => {
    setMobileMenu(false)
  }, [pathname])

  return (
    <>
      <nav className="hidden md:flex">{links}</nav>
      <nav className="md:hidden">
        {mobileIcon}
        {mobileMenu && <div className="absolute right-7 top-12">{links}</div>}
      </nav>
    </>
  )
}

export default AppNav

import React, { FC } from 'react'
import AppHeader from '../components/AppHeader'

interface Props {}

const Layout: FC<Props> = ({ children, ...props }) => {
  return (
    <>
      <div id="main-layout" className="px-6 mx-auto max-w-7xl lg:px-8">
        {' '}
        <AppHeader />
        {children}
      </div>
    </>
  )
}

export default Layout

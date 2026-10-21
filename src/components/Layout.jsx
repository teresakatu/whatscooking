import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'

function Layout({ meals }) {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="layout">
      <Sidebar meals={meals} />
      <div className="layout-main">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout

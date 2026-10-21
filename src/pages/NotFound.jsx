import { Link } from 'react-router-dom'
import Header from '../components/Header.jsx'

function NotFound() {
  return (
    <>
      <Header badge="404" title="Page not found" subtitle={null} />
      <main className="page">
        <div className="status">
          <span className="status-icon">🥄</span>
          <p className="status-title">Nothing is cooking here</p>
          <p>The page you are looking for doesn&apos;t exist.</p>
          <Link to="/" className="button button-link">
            Back to dashboard
          </Link>
        </div>
      </main>
    </>
  )
}

export default NotFound

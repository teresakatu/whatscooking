import { Link, NavLink, useNavigate } from 'react-router-dom'

function Sidebar({ meals }) {
  const navigate = useNavigate()

  const goToRandomMeal = () => {
    const meal = meals[Math.floor(Math.random() * meals.length)]
    navigate(`/meal/${meal.idMeal}`)
  }

  return (
    <aside className="sidebar">
      <Link to="/" className="sidebar-brand">
        <span className="sidebar-logo">🍳</span>
        <span>What&apos;s Cooking?</span>
      </Link>

      <nav className="sidebar-nav">
        <NavLink to="/" end className="sidebar-link">
          <span className="sidebar-link-icon">📊</span>
          Dashboard
        </NavLink>
        <NavLink to="/about" className="sidebar-link">
          <span className="sidebar-link-icon">📖</span>
          About the data
        </NavLink>
        <button
          type="button"
          className="sidebar-link"
          onClick={goToRandomMeal}
          disabled={meals.length === 0}
        >
          <span className="sidebar-link-icon">🎲</span>
          Surprise me
        </button>
      </nav>

      <p className="sidebar-footer">
        Recipes from{' '}
        <a href="https://www.themealdb.com" target="_blank" rel="noreferrer">
          TheMealDB
        </a>
      </p>
    </aside>
  )
}

export default Sidebar

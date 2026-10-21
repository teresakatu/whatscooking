function Header({
  badge = 'Recipe Dashboard',
  title = (
    <>
      What&apos;s Cooking? <span className="header-emoji">🍳</span>
    </>
  ),
  subtitle = 'Search, filter, and explore hundreds of meals from around the world.',
  children,
}) {
  return (
    <header className="header">
      <div className="header-inner">
        <span className="header-badge">{badge}</span>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
        {children}
      </div>
    </header>
  )
}

export default Header

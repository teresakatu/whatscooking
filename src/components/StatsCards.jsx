function StatsCards({ meals }) {
  const totalMeals = meals.length

  const areaCounts = {}
  meals.forEach((meal) => {
    areaCounts[meal.strArea] = (areaCounts[meal.strArea] || 0) + 1
  })

  let topArea = null
  let topAreaCount = 0
  Object.entries(areaCounts).forEach(([area, count]) => {
    if (count > topAreaCount) {
      topArea = area
      topAreaCount = count
    }
  })

  const uniqueCategories = new Set(meals.map((meal) => meal.strCategory)).size

  return (
    <section className="stats">
      <div className="stat-card">
        <span className="stat-label">Total meals shown</span>
        <span className="stat-value">{totalMeals}</span>
      </div>

      <div className="stat-card">
        <span className="stat-label">Most common cuisine</span>
        <span className="stat-value">{topArea ?? '—'}</span>
        {topArea && (
          <span className="stat-detail">
            {topAreaCount} {topAreaCount === 1 ? 'meal' : 'meals'}
          </span>
        )}
      </div>

      <div className="stat-card">
        <span className="stat-label">Unique categories</span>
        <span className="stat-value">{uniqueCategories}</span>
      </div>
    </section>
  )
}

export default StatsCards

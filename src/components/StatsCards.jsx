// Receives the already-filtered meals, so every stat reflects what's on screen.
function StatsCards({ meals }) {
  const totalMeals = meals.length

  // Count how many meals belong to each cuisine: { Italian: 12, Mexican: 7, ... }
  const areaCounts = {}
  meals.forEach((meal) => {
    areaCounts[meal.strArea] = (areaCounts[meal.strArea] || 0) + 1
  })

  // Find the cuisine with the highest count.
  let topArea = null
  let topAreaCount = 0
  Object.entries(areaCounts).forEach(([area, count]) => {
    if (count > topAreaCount) {
      topArea = area
      topAreaCount = count
    }
  })

  // A Set only keeps unique values, so its size is the number of categories.
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

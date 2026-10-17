import MealRow from './MealRow.jsx'

function MealList({ meals, totalCount, onClear }) {
  if (meals.length === 0) {
    return (
      <div className="status">
        <span className="status-icon">🥄</span>
        <p className="status-title">No meals match your filters</p>
        <p>Try a different search, or clear the filters to see everything.</p>
        <button type="button" className="button" onClick={onClear}>
          Clear filters
        </button>
      </div>
    )
  }

  return (
    <section className="meal-list">
      <div className="meal-list-top">
        <h2>Meals</h2>
        <span className="meal-count">
          Showing {meals.length} of {totalCount}
        </span>
      </div>

      <div className="meal-row meal-row-header">
        <span>Image</span>
        <span>Name</span>
        <span>Category</span>
        <span>Cuisine</span>
      </div>

      {meals.map((meal) => (
        <MealRow key={meal.idMeal} meal={meal} />
      ))}
    </section>
  )
}

export default MealList

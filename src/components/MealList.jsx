import MealRow from './MealRow.jsx'

function MealList({ meals }) {
  if (meals.length === 0) {
    return (
      <p className="status">
        No meals match your filters. Try a different search or clear the filters.
      </p>
    )
  }

  return (
    <section className="meal-list">
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

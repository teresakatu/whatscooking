import { Link } from 'react-router-dom'

function MealRow({ meal }) {
  return (
    <Link to={`/meal/${meal.idMeal}`} className="meal-row">
      <img
        className="meal-thumb"
        src={`${meal.strMealThumb}/preview`}
        alt={meal.strMeal}
        loading="lazy"
      />
      <span className="meal-name">{meal.strMeal}</span>
      <span className="meal-category">
        <span className="pill pill-category">{meal.strCategory}</span>
      </span>
      <span className="meal-cuisine">
        <span className="pill pill-cuisine">📍 {meal.strArea}</span>
      </span>
      <span className="meal-arrow" aria-hidden="true">
        →
      </span>
    </Link>
  )
}

export default MealRow

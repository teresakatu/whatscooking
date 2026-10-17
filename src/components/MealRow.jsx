function MealRow({ meal }) {
  return (
    <div className="meal-row">
      <img
        className="meal-thumb"
        src={`${meal.strMealThumb}/preview`}
        alt={meal.strMeal}
        loading="lazy"
      />
      <span className="meal-name">{meal.strMeal}</span>
      <span className="meal-tag meal-category" data-label="Category">
        {meal.strCategory}
      </span>
      <span className="meal-tag meal-cuisine" data-label="Cuisine">
        {meal.strArea}
      </span>
    </div>
  )
}

export default MealRow

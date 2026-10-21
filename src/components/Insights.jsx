import { Link } from 'react-router-dom'
import { getIngredients } from '../utils/meals.js'

const SUGGESTIONS = [
  { emoji: '🍰', label: 'Desserts only', filters: { category: 'Dessert' } },
  { emoji: '🍣', label: 'Japanese cuisine', filters: { area: 'Japanese' } },
  { emoji: '🥗', label: 'Vegetarian meals', filters: { category: 'Vegetarian' } },
  { emoji: '🍛', label: 'Anything with "curry"', filters: { search: 'curry' } },
]

function Insights({ meals, onApplyFilters }) {
  const withCounts = meals
    .map((meal) => ({ meal, count: getIngredients(meal).length }))
    .sort((a, b) => a.count - b.count)

  const simplest = withCounts[0]
  const mostInvolved = withCounts[withCounts.length - 1]
  const median = withCounts[Math.floor(withCounts.length / 2)].count

  return (
    <section className="insights">
      <div className="insights-text">
        <h2>What the data says</h2>
        <p>
          Half of the meals shown need <strong>{median} ingredients or fewer</strong>. The
          simplest is{' '}
          <Link to={`/meal/${simplest.meal.idMeal}`}>{simplest.meal.strMeal}</Link> with
          just {simplest.count}, while{' '}
          <Link to={`/meal/${mostInvolved.meal.idMeal}`}>{mostInvolved.meal.strMeal}</Link>{' '}
          calls for {mostInvolved.count}. The stats, charts, and this summary all follow your
          filters, so try narrowing things down and watch how the picture changes.
        </p>
      </div>

      <div className="insights-suggestions">
        <span className="insights-label">Try a filter</span>
        <div className="chips">
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion.label}
              type="button"
              className="chip"
              onClick={() => onApplyFilters(suggestion.filters)}
            >
              <span>{suggestion.emoji}</span> {suggestion.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Insights

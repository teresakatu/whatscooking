import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/Header.jsx'
import { API_BASE, UNKNOWN, fetchJson, getIngredients } from '../utils/meals.js'

function getSteps(instructions) {
  return instructions
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !/^(step\s*)?\d+[.:)]?$/i.test(line))
    .map((line) => line.replace(/^(step\s*)?\d+[.:)]\s*/i, ''))
}

function MealDetail({ meals }) {
  const { id } = useParams()
  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false

    const fetchMeal = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchJson(`${API_BASE}/lookup.php?i=${id}`)
        if (!ignore) {
          setMeal(data.meals?.[0] ?? null)
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message)
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    fetchMeal()

    return () => {
      ignore = true
    }
  }, [id])

  if (loading || error || !meal) {
    return (
      <>
        <Header badge="Recipe details" title="Recipe details" subtitle={null} />
        <main className="page">
          <div className={`status ${error ? 'status-error' : ''}`}>
            {loading && (
              <>
                <div className="spinner" />
                <p>Loading recipe…</p>
              </>
            )}
            {!loading && error && (
              <>
                <span className="status-icon">⚠️</span>
                <p>Something went wrong while loading this recipe: {error}</p>
              </>
            )}
            {!loading && !error && (
              <>
                <span className="status-icon">🥄</span>
                <p className="status-title">We couldn&apos;t find that meal</p>
                <p>There is no recipe with the ID “{id}”.</p>
              </>
            )}
            {!loading && (
              <Link to="/" className="button button-link">
                Back to dashboard
              </Link>
            )}
          </div>
        </main>
      </>
    )
  }

  const ingredients = getIngredients(meal)
  const steps = getSteps(meal.strInstructions ?? '')
  const tags = meal.strTags ? meal.strTags.split(',').map((tag) => tag.trim()).filter(Boolean) : []
  const related = meals
    .filter((other) => other.strCategory === meal.strCategory && other.idMeal !== meal.idMeal)
    .slice(0, 4)

  return (
    <>
      <Header
        badge={[meal.strCategory, meal.strArea].filter(Boolean).join(' · ')}
        title={meal.strMeal}
        subtitle={null}
      >
        <Link to="/" className="header-back">
          ← Back to dashboard
        </Link>
      </Header>

      <main className="page">
        <section className="detail-hero">
          <img className="detail-image" src={meal.strMealThumb} alt={meal.strMeal} />

          <div className="detail-facts">
            <dl className="facts">
              <div className="fact">
                <dt>Category</dt>
                <dd>
                  <span className="pill pill-category">{meal.strCategory}</span>
                </dd>
              </div>
              <div className="fact">
                <dt>Cuisine</dt>
                <dd>
                  <span className="pill pill-cuisine">📍 {meal.strArea || UNKNOWN}</span>
                </dd>
              </div>
              <div className="fact">
                <dt>Ingredients</dt>
                <dd className="fact-value">{ingredients.length}</dd>
              </div>
              <div className="fact">
                <dt>Steps</dt>
                <dd className="fact-value">{steps.length}</dd>
              </div>
            </dl>

            {tags.length > 0 && (
              <div className="detail-tags">
                {tags.map((tag) => (
                  <span key={tag} className="pill pill-tag">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="detail-links">
              {meal.strYoutube && (
                <a className="button" href={meal.strYoutube} target="_blank" rel="noreferrer">
                  ▶ Watch on YouTube
                </a>
              )}
              {meal.strSource && (
                <a
                  className="button button-secondary"
                  href={meal.strSource}
                  target="_blank"
                  rel="noreferrer"
                >
                  Original recipe ↗
                </a>
              )}
            </div>

            <p className="detail-id">Meal ID #{meal.idMeal}</p>
          </div>
        </section>

        <div className="detail-columns">
          <section className="card">
            <h2>Ingredients</h2>
            <ul className="ingredients">
              {ingredients.map((ingredient, index) => (
                <li key={`${ingredient.name}-${index}`} className="ingredient">
                  <img
                    src={`https://www.themealdb.com/images/ingredients/${encodeURIComponent(
                      ingredient.name
                    )}-Small.png`}
                    alt=""
                    loading="lazy"
                  />
                  <span className="ingredient-name">{ingredient.name}</span>
                  <span className="ingredient-measure">{ingredient.measure}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="card">
            <h2>Instructions</h2>
            <ol className="steps">
              {steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </section>
        </div>

        {related.length > 0 && (
          <section className="card">
            <h2>More {meal.strCategory} meals</h2>
            <div className="related">
              {related.map((other) => (
                <Link key={other.idMeal} to={`/meal/${other.idMeal}`} className="related-item">
                  <img src={`${other.strMealThumb}/preview`} alt="" loading="lazy" />
                  <span className="related-name">{other.strMeal}</span>
                  <span className="related-area">📍 {other.strArea || UNKNOWN}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  )
}

export default MealDetail

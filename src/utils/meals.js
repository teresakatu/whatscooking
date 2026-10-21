export const API_BASE = 'https://www.themealdb.com/api/json/v1/1'

export async function fetchJson(url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Request failed (${response.status}): ${url}`)
  }
  return response.json()
}

export function getIngredients(meal) {
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`]?.trim()
    if (name) {
      ingredients.push({ name, measure: meal[`strMeasure${i}`]?.trim() ?? '' })
    }
  }
  return ingredients
}

export function countBy(meals, key) {
  const counts = {}
  meals.forEach((meal) => {
    const value = meal[key] || 'Unknown'
    counts[value] = (counts[value] || 0) + 1
  })
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
}

import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import StatsCards from './components/StatsCards.jsx'
import FilterBar from './components/FilterBar.jsx'
import MealList from './components/MealList.jsx'
import './App.css'

const API_BASE = 'https://www.themealdb.com/api/json/v1/1'
const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')

// Small helper: fetch a URL and return parsed JSON, throwing on HTTP errors
// so a failed request ends up in our catch block.
async function fetchJson(url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Request failed (${response.status}): ${url}`)
  }
  return response.json()
}

function App() {
  // Data from the API
  const [meals, setMeals] = useState([])
  const [categories, setCategories] = useState([])
  const [areas, setAreas] = useState([])

  // Filter values controlled by the FilterBar
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedArea, setSelectedArea] = useState('All')

  // Request status
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Runs once after the first render (empty dependency array) to load data.
  useEffect(() => {
    // useEffect callbacks can't be async themselves, so we define an async
    // function inside and call it right away.
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // One request per letter, a-z. Promise.all fires them in parallel and
        // waits until every one has finished.
        const letterResults = await Promise.all(
          LETTERS.map((letter) => fetchJson(`${API_BASE}/search.php?f=${letter}`))
        )

        // Each result looks like { meals: [...] } or { meals: null } when no
        // meal starts with that letter. Skip the nulls and flatten the rest.
        const allMeals = letterResults
          .filter((result) => result.meals !== null)
          .flatMap((result) => result.meals)

        const [categoryData, areaData] = await Promise.all([
          fetchJson(`${API_BASE}/list.php?c=list`),
          fetchJson(`${API_BASE}/list.php?a=list`),
        ])

        setMeals(allMeals)
        setCategories(categoryData.meals.map((item) => item.strCategory).sort())
        setAreas(areaData.meals.map((item) => item.strArea).sort())
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Apply all three filters at once. A meal stays only if it passes every check.
  const filteredMeals = meals.filter((meal) => {
    const matchesSearch = meal.strMeal
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase())
    const matchesCategory =
      selectedCategory === 'All' || meal.strCategory === selectedCategory
    const matchesArea = selectedArea === 'All' || meal.strArea === selectedArea

    return matchesSearch && matchesCategory && matchesArea
  })

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All')
    setSelectedArea('All')
  }

  return (
    <div className="app">
      <Header />

      <main className="dashboard">
        {loading && <p className="status">Loading meals…</p>}

        {error && (
          <p className="status status-error">
            Something went wrong while loading meals: {error}
          </p>
        )}

        {!loading && !error && (
          <>
            <StatsCards meals={filteredMeals} />

            <FilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              areas={areas}
              selectedArea={selectedArea}
              onAreaChange={setSelectedArea}
              onClear={clearFilters}
            />

            <MealList meals={filteredMeals} />
          </>
        )}
      </main>
    </div>
  )
}

export default App

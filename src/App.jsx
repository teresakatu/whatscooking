import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import StatsCards from './components/StatsCards.jsx'
import FilterBar from './components/FilterBar.jsx'
import MealList from './components/MealList.jsx'
import './App.css'

const API_BASE = 'https://www.themealdb.com/api/json/v1/1'
const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')

async function fetchJson(url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Request failed (${response.status}): ${url}`)
  }
  return response.json()
}

function App() {
  const [meals, setMeals] = useState([])
  const [categories, setCategories] = useState([])
  const [areas, setAreas] = useState([])

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedArea, setSelectedArea] = useState('All')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const letterResults = await Promise.all(
          LETTERS.map((letter) => fetchJson(`${API_BASE}/search.php?f=${letter}`))
        )

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

  const hasActiveFilters =
    searchQuery !== '' || selectedCategory !== 'All' || selectedArea !== 'All'

  return (
    <div className="app">
      <Header />

      <main className="dashboard">
        {loading && (
          <div className="status">
            <div className="spinner" />
            <p>Loading meals…</p>
          </div>
        )}

        {error && (
          <div className="status status-error">
            <span className="status-icon">⚠️</span>
            <p>Something went wrong while loading meals: {error}</p>
            <button
              type="button"
              className="button"
              onClick={() => window.location.reload()}
            >
              Try again
            </button>
          </div>
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
              hasActiveFilters={hasActiveFilters}
            />

            <MealList
              meals={filteredMeals}
              totalCount={meals.length}
              onClear={clearFilters}
            />
          </>
        )}
      </main>
    </div>
  )
}

export default App

import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import MealDetail from './pages/MealDetail.jsx'
import About from './pages/About.jsx'
import NotFound from './pages/NotFound.jsx'
import { API_BASE, fetchJson } from './utils/meals.js'
import './App.css'

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')

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

  const applyFilters = ({ search = '', category = 'All', area = 'All' }) => {
    setSearchQuery(search)
    setSelectedCategory(category)
    setSelectedArea(area)
  }

  const clearFilters = () => applyFilters({})

  const hasActiveFilters =
    searchQuery !== '' || selectedCategory !== 'All' || selectedArea !== 'All'

  return (
    <Routes>
      <Route path="/" element={<Layout meals={meals} />}>
        <Route
          index
          element={
            <Dashboard
              loading={loading}
              error={error}
              meals={meals}
              filteredMeals={filteredMeals}
              categories={categories}
              areas={areas}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedArea={selectedArea}
              onAreaChange={setSelectedArea}
              onApplyFilters={applyFilters}
              onClear={clearFilters}
              hasActiveFilters={hasActiveFilters}
            />
          }
        />
        <Route path="meal/:id" element={<MealDetail meals={meals} />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App

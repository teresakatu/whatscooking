import { useState } from 'react'
import Header from '../components/Header.jsx'
import StatsCards from '../components/StatsCards.jsx'
import FilterBar from '../components/FilterBar.jsx'
import Insights from '../components/Insights.jsx'
import MealList from '../components/MealList.jsx'
import BreakdownChart from '../components/charts/BreakdownChart.jsx'
import IngredientChart from '../components/charts/IngredientChart.jsx'

function Dashboard({
  loading,
  error,
  meals,
  filteredMeals,
  categories,
  areas,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedArea,
  onAreaChange,
  onApplyFilters,
  onClear,
  hasActiveFilters,
}) {
  const [showCharts, setShowCharts] = useState(true)

  return (
    <>
      <Header />

      <main className="page">
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
              onSearchChange={onSearchChange}
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={onCategoryChange}
              areas={areas}
              selectedArea={selectedArea}
              onAreaChange={onAreaChange}
              onClear={onClear}
              hasActiveFilters={hasActiveFilters}
            />

            {filteredMeals.length > 0 && (
              <>
                <div className="section-bar">
                  <h2>Visualizations</h2>
                  <button
                    type="button"
                    className="button button-secondary button-small"
                    aria-expanded={showCharts}
                    onClick={() => setShowCharts(!showCharts)}
                  >
                    {showCharts ? 'Hide charts' : 'Show charts'}
                  </button>
                </div>

                {showCharts && (
                  <div className="charts">
                    <BreakdownChart meals={filteredMeals} />
                    <IngredientChart meals={filteredMeals} />
                  </div>
                )}

                <Insights meals={filteredMeals} onApplyFilters={onApplyFilters} />
              </>
            )}

            <MealList
              meals={filteredMeals}
              totalCount={meals.length}
              onClear={onClear}
            />
          </>
        )}
      </main>
    </>
  )
}

export default Dashboard

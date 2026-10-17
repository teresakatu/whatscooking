function FilterBar({
  searchQuery,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
  areas,
  selectedArea,
  onAreaChange,
  onClear,
  hasActiveFilters,
}) {
  return (
    <section className="filter-bar">
      <label className="filter filter-search">
        <span>Search by name</span>
        <input
          type="search"
          placeholder="e.g. chicken, pie, curry…"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </label>

      <label className="filter">
        <span>Category</span>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="All">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label className="filter">
        <span>Cuisine</span>
        <select
          value={selectedArea}
          onChange={(e) => onAreaChange(e.target.value)}
        >
          <option value="All">All</option>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </label>

      <button
        type="button"
        className="button button-secondary"
        onClick={onClear}
        disabled={!hasActiveFilters}
      >
        Clear filters
      </button>
    </section>
  )
}

export default FilterBar

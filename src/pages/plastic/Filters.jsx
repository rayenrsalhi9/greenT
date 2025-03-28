import { Search, ShoppingBag, Recycle, Milk } from "lucide-react"
import "./filters.css"

export default function PostsFilters({ activeFilters, toggleFilter, clearFilters, searchQuery, setSearchQuery }) {
  return (
    <div className="search-section">
      <div className="search-container">
        <Search className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search posts, users or plastic types..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="filters-container">
        <div className="filter-buttons">
          <button
            className={`filter-button ${activeFilters.includes("bottles") ? "active" : ""}`}
            
          >
            <Milk className="filter-icon" />
            Bottles
          </button>
          <button
            className={`filter-button ${activeFilters.includes("bags") ? "active" : ""}`}
            
          >
            <ShoppingBag className="filter-icon" />
            Bags
          </button>
          <button
            className={`filter-button ${activeFilters.includes("mixed") ? "active" : ""}`}
            
          >
            <Recycle className="filter-icon" />
            Mixed Items
          </button>
        </div>

        <div className="filter-buttons">
          <button
            className={`filter-button role-filter ${activeFilters.includes("collector") ? "active-collector" : ""}`}
            onClick={() => toggleFilter("collector")}
          >
            Collectors
          </button>
          <button
            className={`filter-button role-filter ${activeFilters.includes("provider") ? "active-provider" : ""}`}
            onClick={() => toggleFilter("provider")}
          >
            Providers
          </button>
          <button
            className={`filter-button role-filter ${activeFilters.includes("admin") ? "active-admin" : ""}`}
            onClick={() => toggleFilter("admin")}
          >
            Admin
          </button>
          <button className="filter-button clear-button" onClick={clearFilters}>
            Clear filters
          </button>
        </div>
      </div>
    </div>
  )
}
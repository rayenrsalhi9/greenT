import { Search, ShoppingBag, Recycle, Milk } from "lucide-react"
import { useTranslation } from "react-i18next"
import "./filters.css"

export default function Filters({ activeFilters, toggleFilter, clearFilters, searchQuery, setSearchQuery }) {
  const { t } = useTranslation()
  return (
    <div className="search-section">
      <div className="search-container">
        <Search className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder={t('search_placeholder')}
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
            {t('bottles')}
          </button>
          <button
            className={`filter-button ${activeFilters.includes("bags") ? "active" : ""}`}
            
          >
            <ShoppingBag className="filter-icon" />
            {t('bags')}
          </button>
          <button
            className={`filter-button ${activeFilters.includes("mixed") ? "active" : ""}`}
            
          >
            <Recycle className="filter-icon" />
            {t('mixed_items')}
          </button>
        </div>

        <div className="filter-buttons">
          <button
            className={`filter-button role-filter ${activeFilters.includes("collector") ? "active-collector" : ""}`}
            onClick={() => toggleFilter("collector")}
          >
            {t('collectors')}
          </button>
          <button
            className={`filter-button role-filter ${activeFilters.includes("provider") ? "active-provider" : ""}`}
            onClick={() => toggleFilter("provider")}
          >
            {t('providers')}
          </button>
          <button
            className={`filter-button role-filter ${activeFilters.includes("admin") ? "active-admin" : ""}`}
            onClick={() => toggleFilter("admin")}
          >
            {t("admin")}
          </button>
          <button className="filter-button clear-button" onClick={clearFilters}>
            {t("clear_filters")}
          </button>
        </div>
      </div>
    </div>
  )
}
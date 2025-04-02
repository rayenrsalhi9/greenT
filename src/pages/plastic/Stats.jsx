import { ScrollText, ShoppingBag, Milk, Recycle } from "lucide-react"
import { useTranslation } from "react-i18next"
import "./stats.css"

export default function Stats({stats}) {
  const { t } = useTranslation()
  return (
    <div className="stats-sidebar">
      <div className="stat-card">
        <div className="stat-icon-large bottle-large">
          <Milk />
        </div>
        <div className="stat-count">{stats.totalBottles}</div>
        <div className="stat-description">{t('total_bottles')}</div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-large bag-large">
          <ShoppingBag />
        </div>
        <div className="stat-count">{stats.totalBags}</div>
        <div className="stat-description">{t('total_bags')}</div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-large mixed-large">
          <Recycle />
        </div>
        <div className="stat-count">{stats.totalMixed}</div>
        <div className="stat-description">{t('total_mixed_items')}</div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-large post-large">
          <ScrollText />
        </div>
        <div className="stat-count">{stats.totalPosts}</div>
        <div className="stat-description">{t('total_posts')}</div>
      </div>
    </div>
  )
}
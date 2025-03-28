import { Plus, ShoppingBag, Milk, Recycle } from "lucide-react"
import "./stats.css"

export default function Stats({stats}) {
  return (
    <div className="stats-sidebar">
      <div className="stat-card">
        <div className="stat-icon-large bottle-large">
          <Milk />
        </div>
        <div className="stat-count">{stats.totalBottles}</div>
        <div className="stat-description">Bottles collected in total</div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-large bag-large">
          <ShoppingBag />
        </div>
        <div className="stat-count">{stats.totalBags}</div>
        <div className="stat-description">Bags collected in total</div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-large mixed-large">
          <Recycle />
        </div>
        <div className="stat-count">{stats.totalMixed}</div>
        <div className="stat-description">Mixed items collected in total</div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-large post-large">
          <Plus />
        </div>
        <div className="stat-count">{stats.totalPosts}</div>
        <div className="stat-description">Posts shared in total</div>
      </div>
    </div>
  )
}
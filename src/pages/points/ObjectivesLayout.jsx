import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { getObjectives } from '../../utils/objectives'

import targetIcon from '../../assets/points/target.png'

import dailyIcon from '../../assets/points/daily.png'
import weeklyIcon from '../../assets/points/weekly.png'
import monthlyIcon from '../../assets/points/monthly.png'
import badgeIcon from '../../assets/points/badge.png'

import doneIcon from '../../assets/points/done.png'
import pendingIcon from '../../assets/points/pending.png'

import './objectives.css'

export default function ObjectivesLayout() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const tab = searchParams.get('tab') || ''

  return (
    <div className="objectives-layout">
      <div className="objectives-layout-header">
        <div className="objectives-layout-header-upper">
          <img src={targetIcon} alt="target" />
          <h3>{t('points-objectives-title')}</h3>
        </div>
        <div className="objectives-layout-header-lower">
          <p>{t('points-objectives-description')}</p>
        </div>
      </div>
      <nav>
        <Link to="?tab=daily" className={ tab && tab === 'daily' ? 'active' : ''}>
          <img src={dailyIcon} alt="daily" />
          {t('points-objectives-daily')}
        </Link>
        <Link to="?tab=weekly" className={ tab && tab === 'weekly' ? 'active' : ''}>
          <img src={weeklyIcon} alt="weekly" />
          {t('points-objectives-weekly')}
        </Link>
        <Link to="?tab=monthly" className={ tab && tab === 'monthly' ? 'active' : ''}>
          <img src={monthlyIcon} alt="monthly" />
          {t('points-objectives-monthly')}
        </Link>
        <Link to="?tab=oneTime" className={ tab && tab === 'oneTime' ? 'active' : ''}>
          <img src={badgeIcon} alt="badge" />
          {t('points-objectives-one-time')}
        </Link>
      </nav>
      <div className="objectives-content">
        {
          searchParams.get('tab') &&
          getObjectives(searchParams.get('tab')).map((objective, key) => (
            <div key={key} className="objectives-content-item">
              <div className="objective-header">
                <div className="objective-header-left">
                  <img src={objective.done ? doneIcon : pendingIcon} alt="done" />
                  <p className={`objective-description ${objective.done ? 'done' : ''}`}>{objective.description}</p>
                </div>
                <p className={`rewarded-points ${objective.done ? 'done' : ''}`}>{objective.points} pts</p>
              </div>
              <div className="objectives-content-item-progress">
                <div className="objectives-content-item-progress-bar">
                  {
                    !objective.currentProgress ?
                      objective.done ?
                        <div className="objectives-content-item-progress-bar filled"></div>
                        :
                        <div className="objectives-content-item-progress-bar empty"></div>
                    :
                    <div className={`progress-bar ${objective.done ? 'done' : ''}`} style={{ width: `${objective.currentProgress / objective.goal * 100}%` }}>
                      {
                        objective.currentProgress && (
                          <span className={`progress-bar-progress ${objective.done ? 'hidden' : ''}`}>{objective.currentProgress}</span>
                        )
                      }
                    </div>
                  }
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

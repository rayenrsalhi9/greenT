import starIcon from '../../assets/points/star.png'
import trophyIcon from '../../assets/points/trophy.png'
import historyIcon from '../../assets/points/history.png'

import { useTranslation } from 'react-i18next'

import { Link } from 'react-router-dom'

import './summary.css'

export default function Summary() {
  const { t } = useTranslation()

  return (
    <div className="summary-layout">
      <div className="header">
        <img src={starIcon} alt="star" />
        <h3>{t('points-history-title')}</h3>
      </div>
      <p>{t('points-history-description')}</p>
      <div className="points-container">
        <div className="points-card">
          <p>{t('points-history-total-points')}</p>
          <span className="points-amount">1000</span>
        </div>
        <img src={trophyIcon} alt="trophy" />
      </div>
      <div className="monthly-progress">
        <h6>{t('points-monthly-progress-title')}</h6>
        <div className="progress-bar">
          <div className="progress"></div>
        </div>
        <p>{t('points-monthly-progress-goal')}: 2000</p>
      </div>
      <div className="history">
        <h6>{t('points-points-history-title')}</h6>
        <div className="history-card">
            <img src={trophyIcon} alt="badge" />
            <p>{t('points-history-card-login')}</p>
        </div>
        <div className="history-card">
          <img src={trophyIcon} alt="badge" />
          <p>{t('points-history-card-share')}</p>
        </div>
        <div className="history-card">
          <img src={trophyIcon} alt="badge" />
          <p>{t('points-history-card-survey')}</p>
        </div>
        <div className="history-card">
          <img src={trophyIcon} alt="badge" />
          <p>{t('points-history-card-post')}</p>
        </div>
        <div className="history-card">
          <img src={trophyIcon} alt="badge" />
          <p>{t('points-history-card-message')}</p>
        </div>
        <Link to="/points/history">
          <img src={historyIcon} alt="history" />
          {t('points-see-all')}
        </Link>
      </div>
    </div>
  )
}

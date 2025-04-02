import { useOutletContext } from 'react-router-dom'
import { format } from 'date-fns'
import { formatNum } from '../../utils/formatNum'

import { useTranslation } from 'react-i18next'

import trophy from '../../assets/trophy.png'
import '../../styles/profile-layout/Profile.css'

export default function Profile() {
  const profile = useOutletContext()
  const creationDate = profile.createdAt ? format(profile.createdAt.toDate(), "MMMM-yyyy") : "Unknown"
  
  const { t } = useTranslation()

  console.log(profile)

  return (
    <section className="profile-overview-container">
      <div className="profile-overview">

        <div className="profile-titles">
          <h1>{t('profile-title')}</h1>
          <p>{t('profile-description')}</p>
        </div>

        <div className="profile-details-container">
          <div className="account-details">
            <h3>{t('account-details-title')}</h3>
            <div className="details-row">
              <p className='title'>{t('account-details-name')}:</p>
              <p> {profile.lastName} {profile.firstName} </p>
            </div>
            <div className="details-row">
              <p className='title'>{t('account-details-email')}:</p>
              <p> {profile.email} </p>
            </div>
            <div className="details-row">
              <p className='title'>{t('account-details-city')}:</p>
              <p> {t(`states.${profile.state}`)}, {t(`cities.${profile.state}.${profile.city}`)} </p>
            </div>
            <div className="details-row">
              <p className='title'>{t('account-details-phone')}:</p>
              <p>
                {
                  profile.phone !== '' && `(+216) ${profile.phone}` 
                }
              </p>
            </div>
            <div className="details-row">
              <p className='title'>{t('account-details-member-since')}:</p>
              <p> {creationDate} </p>
            </div>
            <div className="details-row">
              <p className='title'>{t('account-details-level')}:</p>
              <p className={`badge ${profile.badge === "Plateform Admin" ? "admin" : ""}`}> {profile.badge} </p>
            </div>
          </div>
          <div className="points-summary">
            <h3>{t('points-summary-title')}</h3>
            <div className="points-amount">
              <h1 className='amount'> {formatNum(profile.points)} </h1>
              <p>{t('points-summary-description')}</p>
              <button>{t('points-summary-redeem')}</button>
            </div>
          </div>
        </div>

        <h3>{t('recent-activity-title')}</h3>

        <div className="activity-container">
          <div className="post">
            <img src={trophy} alt="trophy icon" />
            <div className="post-details">
              <h3>First Contribution</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis aspernatur ut fugiat harum modi perspiciatis corporis, laudantium commodi, mollitia quos, obcaecati at! Pariatur quod vitae dolore explicabo, quos accusantium inventore?</p>
            </div>
          </div>
          <div className="post">
            <img src={trophy} alt="trophy icon" />
            <div className="post-details">
              <h3>100 Points Club</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis aspernatur ut fugiat harum modi perspiciatis corporis, laudantium commodi, mollitia quos, obcaecati at! Pariatur quod vitae dolore explicabo, quos accusantium inventore?</p>
            </div>
          </div>
          <div className="post">
            <img src={trophy} alt="trophy icon" />
            <div className="post-details">
              <h3>Regular Recycler</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis aspernatur ut fugiat harum modi perspiciatis corporis, laudantium commodi, mollitia quos, obcaecati at! Pariatur quod vitae dolore explicabo, quos accusantium inventore?</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

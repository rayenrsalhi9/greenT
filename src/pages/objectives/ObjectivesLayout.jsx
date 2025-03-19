/* eslint-disable react-refresh/only-export-components */
import { NavLink, Outlet, useLoaderData } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { auth } from '../../config/firebase'
import { redirect, defer, Await } from 'react-router-dom'
import { Suspense } from 'react'
import Loading from '../../components/Loading'
import { getUserObjectives } from '../../firebase/getProfile'

import targetIcon from '../../assets/points/target.png'

import dailyIcon from '../../assets/points/daily.png'
import weeklyIcon from '../../assets/points/weekly.png'
import monthlyIcon from '../../assets/points/monthly.png'
import badgeIcon from '../../assets/points/badge.png'

import './objectives.css'

export async function loader() {
  return new Promise(resolve => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        resolve(redirect('/login?message=You have to log in to proceed'))
      } else {
        resolve(defer({ objectives: getUserObjectives(user.uid) }))
      }
      unsubscribe()
    })   
  })
}

export default function ObjectivesLayout() {
  const objectivesObject = useLoaderData()
  const { t } = useTranslation()

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={objectivesObject.objectives}>
        {
          objectives => (
            <section className="objectives-layout-container">
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
                      <NavLink to="." end>
                        <img src={dailyIcon} alt="daily" />
                        {t('points-objectives-daily')}
                      </NavLink>
                      <NavLink to="weekly">
                        <img src={weeklyIcon} alt="weekly" />
                        {t('points-objectives-weekly')}
                      </NavLink>
                      <NavLink to="monthly">
                        <img src={monthlyIcon} alt="monthly" />
                        {t('points-objectives-monthly')}
                      </NavLink>
                      <NavLink to="once">
                        <img src={badgeIcon} alt="badge" />
                        {t('points-objectives-one-time')}
                      </NavLink>
                    </nav>
  
                    <Outlet context={objectives}/>

                  </div>
            </section>
          )
        }
      </Await>
    </Suspense>
  ) 
}

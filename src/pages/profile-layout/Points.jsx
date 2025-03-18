/* eslint-disable react-refresh/only-export-components */
import ObjectivesLayout from '../points/ObjectivesLayout'
import Partners from '../points/Partners'
import Summary from '../points/Summary'

import { auth } from '../../config/firebase'
import { getUserObjectives } from '../../firebase/getProfile'
import { Await, defer, useLoaderData, redirect, useSearchParams } from 'react-router-dom'
import { Suspense, useEffect, useState } from 'react'
import Loading from '../../components/Loading'

import './points.css'

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

export default function Points() {
  const objectivesObject = useLoaderData()
  const [cachedObjectives, setCachedObjectives] = useState(objectivesObject.objectives)

  const [searchParams] = useSearchParams()
  const tab = searchParams.get('tab') || ''

  useEffect(() => {
    if (objectivesObject.objectives) {
      setCachedObjectives(objectivesObject.objectives)
    }
  }, [objectivesObject])
  
  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={cachedObjectives}>
        {objectives => (
          <div className="points-layout-container">
            <Summary />
            <ObjectivesLayout objectives={objectives} tab={tab} />
            <Partners />
          </div>
        )}
      </Await>
    </Suspense>
  )
}

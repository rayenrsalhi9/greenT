import Partners from '../points/Partners'
import Summary from '../points/Summary'

import { useOutletContext } from 'react-router-dom'

import './points.css'

export default function Points() {
  const profile = useOutletContext()

  return (
    <div className="points-layout-container">
      <Summary profile={profile} />
      <Partners profile={profile} />
    </div>
  )
}

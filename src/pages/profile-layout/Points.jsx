import ObjectivesLayout from '../points/ObjectivesLayout'
import Partners from '../points/Partners'
import Summary from '../points/Summary'

import './points.css'

export default function Points() {
  return (
    <div className="points-container">
      <Summary />
      <ObjectivesLayout />
      <Partners />
    </div>
  )
}

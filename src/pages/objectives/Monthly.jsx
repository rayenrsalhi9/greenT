import { useOutletContext } from 'react-router-dom'

import doneIcon from '../../assets/points/done.png'
import pendingIcon from '../../assets/points/pending.png'

export default function Monthly() {
  const objectives = useOutletContext()

  return (
    <div className="objectives-content" >
      {
        objectives.filter(objective => objective.type === "monthly").map(objective => (
          <div key={objective.taskID} className="objectives-content-item">
            <div className="objective-header">
              <div className="objective-header-left">
                <img src={objective.done ? doneIcon : pendingIcon} alt="done" />
                <p className={`objective-description ${objective.done ? 'done' : ''}`}>{objective.description}</p>
              </div>
              <p className={`rewarded-points ${objective.done ? 'done' : ''}`}>{objective.points} pts</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}

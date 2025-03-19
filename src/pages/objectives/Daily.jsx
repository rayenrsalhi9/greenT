import { useOutletContext } from 'react-router-dom'

import { useTranslation } from 'react-i18next'
import doneIcon from '../../assets/points/done.png'
import pendingIcon from '../../assets/points/pending.png'

export default function Daily() {
  const objectives = useOutletContext()
  const { t } = useTranslation()
  return (
      <div className="objectives-content">
          {
            objectives.filter(objective => objective.type === "daily").map(objective => (
              <div key={objective.taskID} className="objectives-content-item">
                <div className="objective-header">
                  <div className="objective-header-left">
                    <img src={objective.done ? doneIcon : pendingIcon} alt="done" />
                    <p className={`objective-description ${objective.done ? 'done' : ''}`}>{t(`${objective.taskID}`)}</p>
                  </div>
                  <p className={`rewarded-points ${objective.done ? 'done' : ''}`}>{objective.points} {t('pts')}</p>
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
  )
}

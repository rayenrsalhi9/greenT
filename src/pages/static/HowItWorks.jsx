import "../../styles/static/HowItWorks.css"
import { UserCircle, ImagePlus, MessageCircle, Repeat, Target, Building, Headset } from "lucide-react"
import img1 from '../../assets/howItWorks/img1.jpg'
import img2 from '../../assets/howItWorks/img2.jpg'
import { useTranslation } from 'react-i18next'

const HowItWorks = () => {
  const { t } = useTranslation()

  return (
    <div className="how-it-works-container">
      <div className="wave-top"></div>

      <div className="how-it-works-header">
        <h1>{t('howItWorks.title')}</h1>
        <p>{t('howItWorks.subtitle')}</p>
      </div>

      {/* Steps to use the app */}
      <section className="section" id="steps">
        <div className="section-header">
          <h2>{t('howItWorks.gettingStarted.title')}</h2>
          <p>{t('howItWorks.gettingStarted.subtitle')}</p>
        </div>

        <div className="steps-container">
          {t('howItWorks.gettingStarted.steps', { returnObjects: true }).map((step, index) => (
            <div className="step-card" key={index}>
              <div className="step-icon">
                {index === 0 && <UserCircle size={48} />}
                {index === 1 && <ImagePlus size={48} />}
                {index === 2 && <MessageCircle size={48} />}
                {index === 3 && <Repeat size={48} />}
                <div className="step-number">{index + 1}</div>
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to post properly */}
      <section className="section" id="posting-guide">
        <div className="section-header">
          <h2>{t('howItWorks.postingGuide.title')}</h2>
          <p>{t('howItWorks.postingGuide.subtitle')}</p>
        </div>

        <div className="posting-guide">
          <div className="guide-card">
            <div className="guide-image">
              <img src={img1} alt={t('howItWorks.postingGuide.clearPhotos.title')} loading="lazy"/>
            </div>
            <div className="guide-content">
              <h3>{t('howItWorks.postingGuide.clearPhotos.title')}</h3>
              <ul>
                {t('howItWorks.postingGuide.clearPhotos.tips', { returnObjects: true }).map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="guide-card">
            <div className="guide-content">
              <h3>{t('howItWorks.postingGuide.detailedDescriptions.title')}</h3>
              <ul>
                {t('howItWorks.postingGuide.detailedDescriptions.tips', { returnObjects: true }).map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
            <div className="guide-image">
              <img src={img2} alt={t('howItWorks.postingGuide.detailedDescriptions.title')} loading="lazy" />
            </div>
          </div>
        </div>

        <div className="reminder-box">
          <h3>{t('howItWorks.postingGuide.reminder.title')}</h3>
          <p>{t('howItWorks.postingGuide.reminder.text')}</p>
        </div>
      </section>

      {/* Points rewards system */}
      <section className="section" id="rewards">
        <div className="section-header">
          <h2>{t('howItWorks.rewards.title')}</h2>
          <p>{t('howItWorks.rewards.subtitle')}</p>
        </div>

        <div className="rewards-container">
          <div className="rewards-table">
            <div className="table-header">
              {t('howItWorks.rewards.table.headers', { returnObjects: true }).map((header, index) => (
                <div className="header-cell" key={index}>{header}</div>
              ))}
            </div>

            {t('howItWorks.rewards.table.rows', { returnObjects: true }).map((row, index) => (
              <div className="table-row" key={index}>
                <div className="row-cell">
                  <span className="plastic-type">{row[0]}</span>
                </div>
                <div className="row-cell">{row[1]}</div>
                <div className="row-cell">{row[2]}</div>
              </div>
            ))}
          </div>

          <div className="rewards-info">
            <h3>{t('howItWorks.rewards.pointsUsage.title')}</h3>
            <ul>
              {t('howItWorks.rewards.pointsUsage.items', { returnObjects: true }).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Objectives and achievements */}
      <section className="section" id="objectives">
        <div className="section-header">
          <h2>{t('howItWorks.objectives.title')}</h2>
          <p>{t('howItWorks.objectives.subtitle')}</p>
        </div>

        <div className="objectives-container">
          {t('howItWorks.objectives.achievements', { returnObjects: true }).map((achievement, index) => (
            <div className="objective-card" key={index}>
              <div className="objective-icon">
                <Target size={40} />
              </div>
              <h3>{achievement.title}</h3>
              <p>{achievement.description}</p>
              <div className="achievement-reward">{achievement.reward}</div>
            </div>
          ))}
        </div>

        <div className="objectives-tips">
          <h3>{t('howItWorks.objectives.tips.title')}</h3>
          <ul>
            {t('howItWorks.objectives.tips.items', { returnObjects: true }).map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Partners information */}
      <section className="section" id="partners">
        <div className="section-header">
          <h2>{t('howItWorks.partners.title')}</h2>
          <p>{t('howItWorks.partners.subtitle')}</p>
        </div>

        <div className="partners-container">
          {t('howItWorks.partners.partnerCards', { returnObjects: true }).map((card, index) => (
            <div className="partner-card" key={index}>
              <div className="partner-logo">
                <Building size={48} />
              </div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <a href="#" className="partner-link">
                {card.link}
              </a>
            </div>
          ))}
        </div>

        <div className="become-partner">
          <h3>{t('howItWorks.partners.becomePartner.title')}</h3>
          <p>{t('howItWorks.partners.becomePartner.text')}</p>
          <button className="partner-button">{t('howItWorks.partners.becomePartner.button')}</button>
        </div>
      </section>

      {/* Support and contact */}
      <section className="section" id="support">
        <div className="section-header">
          <h2>{t('howItWorks.support.title')}</h2>
          <p>{t('howItWorks.support.subtitle')}</p>
        </div>

        <div className="support-container">
          {t('howItWorks.support.supportCards', { returnObjects: true }).map((card, index) => (
            <div className="support-card" key={index}>
              <div className="support-icon">
                <Headset size={48} />
              </div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              {card.email && (
                <a href={`mailto:${card.email}`} className="support-link">
                  {card.email}
                </a>
              )}
              {card.link && (
                <a href="#" className="support-link">
                  {card.link}
                </a>
              )}
              <p className="support-hours">{card.hours}</p>
            </div>
          ))}
        </div>

        <div className="faq-section">
          <h3>{t('howItWorks.support.faq.title')}</h3>
          {t('howItWorks.support.faq.items', { returnObjects: true }).map((faq, index) => (
            <div className="faq-item" key={index}>
              <h4>{faq.question}</h4>
              <p>{faq.answer}</p>
            </div>
          ))}
          <a href="#" className="view-all-faq">
            {t('howItWorks.support.faq.viewAll')}
          </a>
        </div>
      </section>

      <div className="cta-section">
        <h2>{t('howItWorks.cta.title')}</h2>
        <p>{t('howItWorks.cta.text')}</p>
        <div className="cta-buttons">
          <button className="primary-button">{t('howItWorks.cta.buttons.0')}</button>
          <button className="secondary-button">{t('howItWorks.cta.buttons.1')}</button>
        </div>
      </div>

      <div className="wave-bottom"></div>
    </div>
  )
}

export default HowItWorks
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { faq } from '../../utils/faq'

import flash from '../../assets/about/flash.png'
import recycle from '../../assets/about/recycle.png'
import community from '../../assets/about/community.png'
import communication from '../../assets/about/speak.png'
import plus from '../../assets/about/plus.png'

import '../../styles/static/About.css'

export default function About() {

  const { t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="about">

        <div className="header">
          <h1>{t('about-title')}</h1>
          <p>
            {t('about-description')}
          </p>
        </div>

        <div className="main-goal">
            <h3>{t('about-connecting-providers-seekers')}</h3>
            <p>
            {t('about-description-connecting-providers-seekers')}
            </p>
        </div>

        <h2 className="title">{t('about-how-it-works')}</h2>

        <div className="how-it-works-container">
          <div className="how-it-works-item">
            <span>01</span>
            <h4>{t('about-how-it-works-signup-login')}</h4>
            <p>
              {t('about-how-it-works-signup-login-description')}
            </p>
          </div>
          <div className="how-it-works-item">
            <span>02</span>
            <h4>{t('about-how-it-works-list-plastic')}</h4>
            <p>
              {t('about-how-it-works-list-plastic-description')}
            </p>
          </div>
          <div className="how-it-works-item">
            <span>03</span>
            <h4>{t('about-how-it-works-find-match')}</h4>
            <p>
              {t('about-how-it-works-find-match-description')}
            </p>
          </div>
          <div className="how-it-works-item">
            <span>04</span>
            <h4>{t('about-how-it-works-coordinate-exchange')}</h4>
            <p>
              {t('about-how-it-works-coordinate-exchange-description')}
            </p>
          </div>  
        </div>

        <h2 className="title">{t('about-why-choose-platform')}</h2>

        <div className="why-choose-container">
          <div className="why-choose-item">
            <div className="card-header">
              <img src={flash} alt="flash" />
              <h4>{t('about-why-choose-platform-efficiency')}</h4>
            </div>
            <p>
            {t('about-why-choose-platform-efficiency-description')}
            </p>
          </div>
          <div className="why-choose-item">
            <div className="card-header">
              <img src={recycle} alt="recycle" />
              <h4>{t('about-why-choose-platform-sustainability')}</h4>
            </div>
            <p>
            {t('about-why-choose-platform-sustainability-description')}
            </p>
          </div>
          <div className="why-choose-item">
            <div className="card-header">
              <img src={community} alt="community" />
              <h4>{t('about-why-choose-platform-community')}</h4>
            </div>
            <p>
            {t('about-why-choose-platform-community-description')}
            </p>
          </div>
          <div className="why-choose-item">
            <div className="card-header">
              <img src={communication} alt="communication" />
              <h4>{t('about-why-choose-platform-easy-communication')}</h4>
            </div>
            <p>
            {t('about-why-choose-platform-easy-communication-description')}
            </p>
          </div>
        </div>

        <h2 className="title">{t('about-faq-title')}</h2>

        <div className="faq-container">
          {faq.map((_, index) => (
            <div className="faq-item " key={index}>
              <div className="accordion-header">
                <h4>{t(`about-faq-question-${index + 1}`)}</h4>
                <img src={plus} alt="plus" onClick={() => toggleAccordion(index)} className={activeIndex === index ? 'active' : ''}/>
              </div>
              <p className={`accordion-content ${activeIndex === index ? 'active' : 'hidden'}`}>
                {t(`about-faq-answer-${index + 1}`)}
              </p>
            </div>
          ))}
        </div>
    </section>
  )
}

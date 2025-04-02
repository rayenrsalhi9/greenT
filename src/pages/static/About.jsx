import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { faq } from '../../utils/faq'
import { Zap, Recycle, MessageCircleHeart, UsersRound, Plus } from 'lucide-react'

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
              <Zap size={30} />
              <h4>{t('about-why-choose-platform-efficiency')}</h4>
            </div>
            <p>
            {t('about-why-choose-platform-efficiency-description')}
            </p>
          </div>
          <div className="why-choose-item">
            <div className="card-header">
              <Recycle size={30} />
              <h4>{t('about-why-choose-platform-sustainability')}</h4>
            </div>
            <p>
            {t('about-why-choose-platform-sustainability-description')}
            </p>
          </div>
          <div className="why-choose-item">
            <div className="card-header">
              <UsersRound size={30} />
              <h4>{t('about-why-choose-platform-community')}</h4>
            </div>
            <p>
            {t('about-why-choose-platform-community-description')}
            </p>
          </div>
          <div className="why-choose-item">
            <div className="card-header">
              <MessageCircleHeart size={30} />
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
                <Plus 
                  onClick={() => toggleAccordion(index)} 
                  size={20} 
                  className={`icon ${activeIndex === index ? 'active' : ''}`}
                />
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

import { Link } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

import homePageImg from '../../assets/home-img.jpg'
import '../../styles/static/Home.css'

export default function Home() {

    const { t } = useTranslation()

  return (
    <section className="home">
        <div className="hero-section">
            <div className="hero-content">
                <h1 className='hero-title'>
                    {t("home-title")}
                </h1>
                <p>
                    {t("home-description")}
                </p>
                <Link to="login" className='plastics-link-btn'>
                    {t("home-button")}
                </Link>
            </div>
            <div className="hero-image">
                <img src={homePageImg} alt="home page image" />
            </div>
        </div>
        <div className="nav-section">
            <h2>{t('home-nav-title')}</h2>
            <p>{t('home-nav-description')}</p>
            <div className="buttons-section">
                <Link to="signup" className='signup-link'>{t('home-nav-signup')}</Link>
                <Link to="about" className='about-link'>{t('home-nav-about')}</Link>
            </div>
        </div>
    </section>
  )
}

import { Link } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

import logo from '../assets/page-icon.png'

import homeImg from '../assets/homepage.png'
import aboutImg from '../assets/about.png'
import contactImg from '../assets/admin.png'

import facebookImg from '../assets/facebook.png'
import twitterImg from '../assets/twitter.png'
import instagramImg from '../assets/instagram.png'

import './footer.css'

export default function Footer() {

    const { i18n } = useTranslation()

    const handleLanguageChange = (e) => {
        i18n.changeLanguage(e.target.value)
    }

    return (
        <footer>
            <div className="footer-content">
                <div className="footer-pattern-top"></div>
                <div className="footer-sections">
                    <div className="section">
                        <div className="logo">
                            <img src={logo} alt="Greent Logo" />
                            <h3>Greent</h3>
                        </div>
                        <p>
                            {i18n.t('footer-description')}
                        </p>
                        <select value={i18n.language} className='language-select' name="language" id="language" onChange={handleLanguageChange}>
                            <option disabled>{i18n.t('footer-language')}</option>
                            <option value="en">{i18n.t('footer-language-en')}</option>
                            <option value="fr">{i18n.t('footer-language-fr')}</option>
                            <option value="ar">{i18n.t('footer-language-ar')}</option>
                        </select>
                    </div>
                    <div className="section">
                        <h3>{i18n.t('footer-links')}</h3>
                        <div className="links-section">
                            <Link to="/">
                                <img src={homeImg} alt="Home" />
                                {i18n.t('footer-links-home')}
                            </Link>
                            <Link to="/about">
                                <img src={aboutImg} alt="About" />
                                {i18n.t('footer-links-about')}
                            </Link>
                            <Link to="/contact">
                                <img src={contactImg} alt="Contact" />
                                {i18n.t('footer-links-contact')}
                            </Link>
                        </div>
                    </div>
                    <div className="section">
                        <h3>{i18n.t('footer-follow-us')}</h3>
                        <div className="social-section">
                            <Link to="/">
                                <img src={facebookImg} alt="Facebook" />
                                {i18n.t('footer-facebook')}
                            </Link>
                            <Link to="/">
                                <img src={twitterImg} alt="Twitter" />
                                {i18n.t('footer-twitter')}
                            </Link>
                            <Link to="/">
                                <img src={instagramImg} alt="Instagram" />
                                {i18n.t('footer-instagram')}
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="copyright-section">
                    <p>
                        &copy; {new Date().getFullYear()} GreenT - {i18n.t('footer-copyright')}
                    </p>
                </div>
                <div className="footer-pattern-bottom"></div>
            </div>
        </footer>
    )
}

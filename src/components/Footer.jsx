import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import {
  ChevronDown,
  Facebook,
  Instagram,
  Leaf,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Home,
  Info,
  HelpCircle
} from "lucide-react"
import "./footer.css"

export default function Footer () {
  const { i18n } = useTranslation()

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value)
  };

  return (
    <footer className="footer">
      
    {/* Animated wave divider */}
    <div className="wave-container">
          <div className="wave-wrapper">
            <svg className="wave-svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                opacity=".25"
                className="wave-path-1"
              ></path>
              <path
                d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                opacity=".5"
                className="wave-path-2"
              ></path>
              <path
                d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                className="wave-path-3"
              ></path>
            </svg>
          </div>
        </div>

      <div className="footer-container">
        <div className="footer-main">
          {/* Brand section */}
          <div className="brand-section">
            <div className="brand-header">
              <h2 className="brand-title">GreenT</h2>
              <Leaf className="brand-icon" />
            </div>
            <p className="brand-description">
              {i18n.t("footer_description")}
            </p>

            <div className="language-selector-container">
              <select value={i18n.language} onChange={handleLanguageChange} className="language-selector">
                <option value="en">{i18n.t("footer_en")}</option>
                <option value="fr">{i18n.t("footer_fr")}</option>
                <option value="ar">{i18n.t("footer_ar")}</option>
              </select>
              <ChevronDown className="selector-icon" />
            </div>

            <div className="social-links">
              <Link to="." className="social-link" aria-label="Facebook">
                <Facebook className="social-icon" />
              </Link>
              <Link to="." className="social-link" aria-label="Twitter">
                <Twitter className="social-icon" />
              </Link>
              <Link to="." className="social-link" aria-label="Instagram">
                <Instagram className="social-icon" />
              </Link>
            </div>
          </div>

          {/* Links and Contact in a column */}
          <div className="footer-nav">
            {/* Quick links */}
            <div className="links-section">
              <h3 className="section-title">{i18n.t("footer_quick_links")}</h3>
              <ul className="links-list">
                <li>
                  <Link to="/" className="nav-link">
                    <Home className="link-icon" />
                    <span>{i18n.t("footer_home")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="about" className="nav-link">
                    <Info className="link-icon" />
                    <span>{i18n.t("footer_about")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="howToUse" className="nav-link">
                    <HelpCircle className="link-icon" />
                    <span>{i18n.t("footer_how")}</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact section */}
          <div className="contact-section">
              <h3 className="section-title">{i18n.t("footer_contact")}</h3>
              <div className="contact-list">
                <div className="contact-item">
                  <Mail className="contact-icon" />
                  <span>-</span>
                </div>
                <div className="contact-item">
                  <Phone className="contact-icon" />
                  <span>-</span>
                </div>
                <div className="contact-item">
                  <MapPin className="contact-icon" />
                  <span>{i18n.t(`cities.${'Tunis'}.${"Centre Ville"}`)}, {i18n.t(`states.${'Tunis'}`)}</span>
                </div>
              </div>
            </div>
        </div>

        {/* Copyright */}
        <div className="copyright-container">
          <p className="copyright-text">© GreenT {new Date().getFullYear()} - {i18n.t('footer_copyright')}</p>
          <div className="policy-links">
            <a href="#" className="policy-link">
              {i18n.t("footer_privacy_policy")}
            </a>
            <a href="#" className="policy-link">
              {i18n.t("footer_terms_of_use")}
            </a>
            <a href="#" className="policy-link">
              {i18n.t("footer_cookie_policy")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
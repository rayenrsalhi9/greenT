import { useState, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { auth } from "../config/firebase"
import {Link, useNavigate} from "react-router-dom"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { getUser } from "../firebase/getProfile"
import {
  Leaf,
  Search,
  Menu,
  X,
  ChevronDown,
  User,
  LogIn,
  UserPlus,
  Cog,
  Upload,
  Info,
  Home,
  MapPin,
  Mail,
  LogOut,
  FileSearch
} from "lucide-react"

import "./navbar.css"

export default function Navbar() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [profile, setProfile] = useState(null)

  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const userMenuRef = useRef(null)

  useEffect(() => {
    const fetchProfile = async () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          getUser(user.uid).then((data) => {
            setProfile(data)
          })
        }
      })
    }
    fetchProfile()
  }, [])

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle hover for dropdown menus
  const handleMouseEnter = (dropdown) => {
    setActiveDropdown(dropdown)
  }

  const handleMouseLeave = () => {
    setActiveDropdown(null)
  }

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="navbar-logo-icon">
            <Leaf className="navbar-leaf-icon" />
          </div>
          <span className="navbar-brand-text">GreenT</span>
          <span className="navbar-badge">{t('navbar_eco_friendly')}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="navbar-desktop-nav">
          <ul className="navbar-menu-list">
            <li
              className="navbar-menu-item"
              onMouseEnter={() => handleMouseEnter("find")}
              onMouseLeave={handleMouseLeave}
            >
              <button className="navbar-menu-button">
                {t('navbar_find_plastics')}
                <ChevronDown className="navbar-menu-icon" />
              </button>
              {activeDropdown === "find" && (
                <div className="navbar-dropdown navbar-dropdown-wide">
                  <ul className="navbar-dropdown-grid">
                    <li className="navbar-dropdown-feature">
                      <Link to="posts" className="navbar-feature-link">
                        <MapPin className="navbar-feature-icon" />
                        <div className="navbar-feature-title">{t('navbar_see_all_posts')}</div>
                        <p className="navbar-feature-description">
                          {t('navbar_see_all_posts_description')}
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="posts" className="navbar-dropdown-link">
                        <div className="navbar-dropdown-title">{t('navbar_categories')}</div>
                        <p className="navbar-dropdown-description">{t('navbar_categories_description')}</p>
                      </Link>
                    </li>
                    <li>
                      <Link to="posts" className="navbar-dropdown-link">
                        <div className="navbar-dropdown-title">{t('navbar_nearby')}</div>
                        <p className="navbar-dropdown-description">{t('navbar_nearby_description')}</p>
                      </Link>
                    </li>
                    <li>
                      <Link to="posts" className="navbar-dropdown-link">
                        <div className="navbar-dropdown-title">{t('navbar_trending')}</div>
                        <p className="navbar-dropdown-description">{t('navbar_trending_description')}</p>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li
              className="navbar-menu-item"
              onMouseEnter={() => handleMouseEnter("post")}
              onMouseLeave={handleMouseLeave}
            >
              <button className="navbar-menu-button">
                {t('navbar_post_plastics')}
                <ChevronDown className="navbar-menu-icon" />
              </button>
              {activeDropdown === "post" && (
                <div className="navbar-dropdown">
                  <ul className="navbar-dropdown-grid">
                    <li>
                      <Link to="newPost" className="navbar-dropdown-link navbar-dropdown-link-featured">
                        <Upload className="navbar-dropdown-icon" />
                        <div>
                          <div className="navbar-dropdown-title">{t('navbar_quick_post')}</div>
                          <p className="navbar-dropdown-description">{t('navbar_quick_post_description')}</p>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="howToUse" className="navbar-dropdown-link">
                        <div className="navbar-dropdown-title">{t('navbar_post_guide')}</div>
                        <p className="navbar-dropdown-description">
                          {t('navbar_post_guide_description')}
                        </p>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li className="navbar-menu-item">
              <Link to="howToUse" className="navbar-menu-link">
                {t('navbar_how_it_works')}
              </Link>
            </li>
            <li
              className="navbar-menu-item"
              onMouseEnter={() => handleMouseEnter("about")}
              onMouseLeave={handleMouseLeave}
            >
              <button className="navbar-menu-button">
                {t('navbar_about')}
                <ChevronDown className="navbar-menu-icon" />
              </button>
              {activeDropdown === "about" && (
                <div className="navbar-dropdown">
                  <ul className="navbar-dropdown-grid">
                    <li>
                      <Link to="about" className="navbar-dropdown-link">
                        <div className="navbar-dropdown-title">{t('navbar_our_mission')}</div>
                        <p className="navbar-dropdown-description">
                          {t('navbar_our_mission_description')}
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="about" className="navbar-dropdown-link">
                        <div className="navbar-dropdown-title">{t('navbar_team')}</div>
                        <p className="navbar-dropdown-description">{t('navbar_team_description')}</p>
                      </Link>
                    </li>
                    <li>
                      <Link to="about" className="navbar-dropdown-link">
                        <div className="navbar-dropdown-title">{t('navbar_contact_us')}</div>
                        <p className="navbar-dropdown-description">{t('navbar_contact_us_description')}</p>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </nav>

        {/* Right Side Actions */}
        <div className="navbar-actions">
          <div className="navbar-dropdown-container" ref={userMenuRef}>
            <button
              className="navbar-user-button"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              aria-label="User menu"
            >
              <User className="navbar-user-icon" />
            </button>
            {userMenuOpen && (
              <div className="navbar-user-menu">
                <div className="navbar-user-header">
                  <div className="navbar-user-avatar">
                    <User className="navbar-user-avatar-icon" />
                  </div>
                  <div>
                    
                    {
                        auth.currentUser ? (
                          <p className="navbar-user-name">{profile && profile.firstName + " " + profile.lastName}</p>
                        ) : (
                          <>
                            <p className="navbar-user-name">{t('navbar_guest_user')}</p>
                            <p className="navbar-user-status">{t('navbar_guest_user_description')}</p>
                          </>
                        )
                    }
                  </div>
                </div>
                <hr className="navbar-divider" />
                {
                    !auth.currentUser ? (
                        <>
                            <Link to="/login" className="navbar-user-menu-item">
                                <LogIn className="navbar-user-menu-icon" />
                                <span>{t('navbar_login')}</span>
                            </Link>
                            <Link to="/signup" className="navbar-user-menu-item">
                                <UserPlus className="navbar-user-menu-icon" />
                                <span>{t('navbar_create_account')}</span>
                            </Link>
                        </>
                      )  : (
                        <>
                            <Link to="profile" className="navbar-user-menu-item">
                                <User className="navbar-user-menu-icon" />
                                <span>{t('navbar_profile')}</span>
                            </Link>
                            <Link to="profile/settings" className="navbar-user-menu-item">
                                <Cog className="navbar-user-menu-icon" />
                                <span>{t('navbar_settings')}</span>
                            </Link>
                            <button 
                                className=" navbar-user-menu-item navbar-user-button-logout"
                                onClick={() => {
                                    signOut(auth)
                                    setUserMenuOpen(false)
                                    navigate("login?message=Disconnected successfully.")
                                }}
                            >
                                <LogOut className="navbar-user-menu-icon" />
                                <span>{t('navbar_logout')}</span>
                            </button>
                        </>
                      )
                }
                
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <button className="navbar-mobile-menu-button" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
            <Menu className="navbar-icon" />
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      <div className={`navbar-search-overlay ${searchOpen ? "navbar-search-open" : ""}`}>
        <div className="navbar-search-container">
          <div className="navbar-search-wrapper">
            <Search className="navbar-search-icon" />
            <input
              type="text"
              placeholder="Search for plastics, recycling centers, or materials..."
              className="navbar-search-input"
              autoFocus={searchOpen}
            />
          </div>
          <button
            className="navbar-icon-button navbar-search-close"
            onClick={() => setSearchOpen(false)}
            aria-label="Close search"
          >
            <X className="navbar-icon" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="navbar-mobile-overlay">
          <div className="navbar-mobile-menu">
            <div className="navbar-mobile-header">
              <div className="navbar-mobile-title">
                <div className="navbar-logo-icon">
                  <Leaf className="navbar-leaf-icon" />
                </div>
                <span className="navbar-brand-text">GreenT</span>
              </div>
              <button className="navbar-icon-button" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                <X className="navbar-icon" />
              </button>
            </div>
            <div className="navbar-mobile-content">
              <nav className="navbar-mobile-nav">
                <a href="/" className="navbar-mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                  <Home className="navbar-mobile-nav-icon" />
                  <span>{t('navbar_home')}</span>
                </a>
                <div className="navbar-mobile-nav-section">
                  <p className="navbar-mobile-nav-section-title">{t('navbar_find_plastics')}</p>
                  <Link to="posts" className="navbar-mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                    <FileSearch className="navbar-mobile-nav-icon" />
                    <span>{t('navbar_all_posts')}</span>
                  </Link>
                </div>
                <div className="navbar-mobile-nav-section">
                  <p className="navbar-mobile-nav-section-title">{t('navbar_post_plastics')}</p>
                  <Link to="newPost" className="navbar-mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                    <Upload className="navbar-mobile-nav-icon" />
                    <span>{t('navbar_quick_post')}</span>
                  </Link>
                </div>
                <Link to="howItWorks" className="navbar-mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                  <Info className="navbar-mobile-nav-icon" />
                  <span>{t('navbar_how_it_works')}</span>
                </Link>
                <div className="navbar-mobile-nav-section">
                  <p className="navbar-mobile-nav-section-title">{t('navbar_about')}</p>
                  <Link to="about" className="navbar-mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                    <Info className="navbar-mobile-nav-icon" />
                    <span>{t('navbar_about')}</span>
                  </Link>
                  <Link to="contact" className="navbar-mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                    <Mail className="navbar-mobile-nav-icon" />
                    <span>{t('navbar_contact_us')}</span>
                  </Link>
                </div>
              </nav>
            </div>
            <div className="navbar-mobile-footer">
              <div className="navbar-mobile-buttons">
                {
                    !auth.currentUser ? (
                        <>
                            <Link
                                to="/login"
                                className="navbar-outline-button navbar-mobile-signin"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <LogIn className="navbar-mobile-button-icon" />
                                {t('navbar_login')}
                            </Link>
                            <Link
                                to="/signup"
                                className="navbar-primary-button navbar-mobile-register"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <UserPlus className="navbar-mobile-button-icon" />
                                {t('navbar_create_account')}
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to="profile"
                                className="navbar-primary-button navbar-mobile-register"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <User className="navbar-mobile-button-icon" />
                                {t('navbar_profile')}
                            </Link>
                            <button
                                className="navbar-outline-button navbar-mobile-signout"
                                aria-label="Sign out"
                                onClick={() => {
                                    signOut(auth)
                                    setMobileMenuOpen(false)
                                    navigate('/login?message=Disconnected successfully.')
                                }}
                            >
                                <LogOut className="navbar-mobile-button-icon" />
                                {t('navbar_logout')}
                            </button>
                        </>
                    )
                }
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
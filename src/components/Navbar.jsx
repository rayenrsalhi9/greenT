import { useState, useEffect, useRef } from "react"
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

  // Toggle dropdown menus
  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="navbar-logo-icon">
            <Leaf className="navbar-leaf-icon" />
          </div>
          <span className="navbar-brand-text">GreenT</span>
          <span className="navbar-badge">Eco-friendly</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="navbar-desktop-nav">
          <ul className="navbar-menu-list">
            <li className="navbar-menu-item">
              <button
                className={`navbar-menu-button ${activeDropdown === "find" ? "active" : ""}`}
                onClick={() => toggleDropdown("find")}
              >
                Find Plastics
                <ChevronDown className="navbar-menu-icon" />
              </button>
              {activeDropdown === "find" && (
                <div className="navbar-dropdown navbar-dropdown-wide">
                  <ul className="navbar-dropdown-grid">
                    <li className="navbar-dropdown-feature">
                      <Link to="posts" className="navbar-feature-link">
                        <MapPin className="navbar-feature-icon" />
                        <div className="navbar-feature-title">Interactive Map</div>
                        <p className="navbar-feature-description">
                          Find recycling locations and plastic drop-off points near you
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="posts" className="navbar-dropdown-link">
                        <div className="navbar-dropdown-title">Categories</div>
                        <p className="navbar-dropdown-description">Browse by plastic type and recycling category</p>
                      </Link>
                    </li>
                    <li>
                      <Link to="posts" className="navbar-dropdown-link">
                        <div className="navbar-dropdown-title">Nearby</div>
                        <p className="navbar-dropdown-description">Discover available plastics in your local area</p>
                      </Link>
                    </li>
                    <li>
                      <a href="posts" className="navbar-dropdown-link">
                        <div className="navbar-dropdown-title">Trending</div>
                        <p className="navbar-dropdown-description">Most sought-after plastic materials right now</p>
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li className="navbar-menu-item">
              <button
                className={`navbar-menu-button ${activeDropdown === "post" ? "active" : ""}`}
                onClick={() => toggleDropdown("post")}
              >
                Post Plastics
                <ChevronDown className="navbar-menu-icon" />
              </button>
              {activeDropdown === "post" && (
                <div className="navbar-dropdown">
                  <ul className="navbar-dropdown-grid">
                    <li>
                      <Link to="newPost" className="navbar-dropdown-link navbar-dropdown-link-featured">
                        <Upload className="navbar-dropdown-icon" />
                        <div>
                          <div className="navbar-dropdown-title">Quick Post</div>
                          <p className="navbar-dropdown-description">List your recyclable plastics in minutes</p>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="howToUse" className="navbar-dropdown-link">
                        <div className="navbar-dropdown-title">Posting Guide</div>
                        <p className="navbar-dropdown-description">
                          Learn how to effectively list your recyclable materials
                        </p>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li className="navbar-menu-item">
              <Link to="howToUse" className="navbar-menu-link">
                How it Works
              </Link>
            </li>
            <li className="navbar-menu-item">
              <button
                className={`navbar-menu-button ${activeDropdown === "about" ? "active" : ""}`}
                onClick={() => toggleDropdown("about")}
              >
                About GreenT
                <ChevronDown className="navbar-menu-icon" />
              </button>
              {activeDropdown === "about" && (
                <div className="navbar-dropdown">
                  <ul className="navbar-dropdown-grid">
                    <li>
                      <Link to="about" className="navbar-dropdown-link">
                        <div className="navbar-dropdown-title">Our Mission</div>
                        <p className="navbar-dropdown-description">
                          Learn about our commitment to sustainable plastic management
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="about" className="navbar-dropdown-link">
                        <div className="navbar-dropdown-title">Team</div>
                        <p className="navbar-dropdown-description">Meet the people behind GreenT</p>
                      </Link>
                    </li>
                    <li>
                      <Link to="about" className="navbar-dropdown-link">
                        <div className="navbar-dropdown-title">Impact</div>
                        <p className="navbar-dropdown-description">
                          See the environmental difference we're making together
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="about" className="navbar-dropdown-link">
                        <div className="navbar-dropdown-title">Contact Us</div>
                        <p className="navbar-dropdown-description">Get in touch with our support team</p>
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
                            <p className="navbar-user-name">Guest User</p>
                            <p className="navbar-user-status">Sign in to access your account</p>
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
                                <span>Sign In</span>
                            </Link>
                            <Link to="/signup" className="navbar-user-menu-item">
                                <UserPlus className="navbar-user-menu-icon" />
                                <span>Create Account</span>
                            </Link>
                        </>
                      )  : (
                        <>
                            <Link to="profile" className="navbar-user-menu-item">
                                <User className="navbar-user-menu-icon" />
                                <span>Profile</span>
                            </Link>
                            <Link to="profile/settings" className="navbar-user-menu-item">
                                <Cog className="navbar-user-menu-icon" />
                                <span>Settings</span>
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
                                <span>Sign Out</span>
                            </button>
                        </>
                      )
                }
                <hr className="navbar-divider" />
                <Link to="/about" className="navbar-user-menu-item">
                <Info className="navbar-user-menu-icon" />
                  About GreenT
                </Link>
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
              <div className="navbar-mobile-search">
                <div className="navbar-mobile-search-wrapper">
                  <Search className="navbar-mobile-search-icon" />
                  <input type="text" placeholder="Search..." className="navbar-mobile-search-input" />
                </div>
              </div>
              <nav className="navbar-mobile-nav">
                <a href="/" className="navbar-mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                  <Home className="navbar-mobile-nav-icon" />
                  <span>Home</span>
                </a>
                <div className="navbar-mobile-nav-section">
                  <p className="navbar-mobile-nav-section-title">Find Plastics</p>
                  <Link to="posts" className="navbar-mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                    <FileSearch className="navbar-mobile-nav-icon" />
                    <span>See all posts</span>
                  </Link>
                </div>
                <div className="navbar-mobile-nav-section">
                  <p className="navbar-mobile-nav-section-title">Post Plastics</p>
                  <Link to="newPost" className="navbar-mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                    <Upload className="navbar-mobile-nav-icon" />
                    <span>Quick Post</span>
                  </Link>
                </div>
                <Link to="howItWorks" className="navbar-mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                  <Info className="navbar-mobile-nav-icon" />
                  <span>How the app works</span>
                </Link>
                <div className="navbar-mobile-nav-section">
                  <p className="navbar-mobile-nav-section-title">About GreenT</p>
                  <Link to="about" className="navbar-mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                    <Info className="navbar-mobile-nav-icon" />
                    <span>About GreenT</span>
                  </Link>
                  <Link to="contact" className="navbar-mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                    <Mail className="navbar-mobile-nav-icon" />
                    <span>Contact Admin</span>
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
                                Sign In
                            </Link>
                            <Link
                                to="/signup"
                                className="navbar-primary-button navbar-mobile-register"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <UserPlus className="navbar-mobile-button-icon" />
                                New account
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
                                Profile
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
                                Sign Out
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
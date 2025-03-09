import { NavLink, useNavigate } from "react-router-dom"
import { signout } from "../firebase/signOut"

import { useTranslation } from 'react-i18next'

import userIcon from '../assets/profile.png'

import overviewIcon from '../assets/overview.png'
import postIcon from '../assets/posts.png'
import pointsIcon from '../assets/change.png'
import settingsIcon from '../assets/settings.png'
import logoutIcon from '../assets/logout.png'
import messagesIcon from '../assets/message.png'

import '../styles/ProfileNav.css'

export default function ProfileNav({profile}) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleLogout = () => {
    signout(navigate)
  }

  return (
    <nav className="profile-navbar">

      <div className="profile-info">

        <img src={userIcon} alt="profile image" className="profile-pic" />

        <div className="profile-info-details">
          <h3> {profile.lastName} {profile.firstName} </h3>
          <p> {profile.email} </p>
          <span className="badge"> {profile.badge} </span>
        </div>

      </div>

      <div className="navigation-links">
        <NavLink to="/profile" end>
          <img src={overviewIcon} alt="overview icon" loading="lazy" />
          {t('profile-links-overview')}
        </NavLink>
        <NavLink to="posts">
          <img src={postIcon} alt="post icon" loading="lazy" />
          {t('profile-links-plastics')}
        </NavLink>
        <NavLink to="messages">
          <img src={messagesIcon} alt="messages icon" />
          {t('profile-links-messages')}
        </NavLink>
        <NavLink to="points">
          <img src={pointsIcon} alt="points icon" />
          {t('profile-links-points')}
        </NavLink>
        <NavLink to="settings">
          <img src={settingsIcon} alt="settings icon" />
          {t('profile-links-settings')}
        </NavLink>
        <button className="logout" onClick={handleLogout}>
          <img src={logoutIcon} alt="logout icon" />
          {t('profile-links-logout')}
        </button>
      </div>
    </nav>
  )
}

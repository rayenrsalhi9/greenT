import { NavLink, useNavigate } from "react-router-dom"
import { signout } from "../firebase/signOut"

import { useTranslation } from 'react-i18next'

import {
  UserRound,
  ScanSearch,
  Repeat2,
  Settings,
  Coins,
  Target,
  LogOut,
  Bookmark
} from "lucide-react"

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

        <div className="user-avatar">
          <UserRound className="user-icon" size={40}/>
        </div>

        <div className="profile-info-details">
          <h3> {profile.lastName} {profile.firstName} </h3>
          <p> {profile.email} </p>
          <span className={`badge ${profile.badge === "Plateform Admin" ? "admin" : ""}`}> {profile.badge} </span>
        </div>

      </div>

      <div className="navigation-links">
        <NavLink to="/profile" end>
          <ScanSearch />
          {t('profile-links-overview')}
        </NavLink>
        <NavLink to="posts">
          <Repeat2 />
          {t('profile-links-plastics')}
        </NavLink>
        <NavLink to="saved">
          <Bookmark />
          {t('profile-links-saved')}
        </NavLink>
        {
          profile.badge !== "Plateform Admin" &&
          <NavLink to="points">
            <Coins />
            {t('profile-links-points')}
          </NavLink>
        }
        {
          profile.badge !== "Plateform Admin" &&
          <NavLink to="objectives">
            <Target />
            {t('profile-links-objectives')}
          </NavLink>
        }
        <NavLink to="settings">
          <Settings />
          {t('profile-links-settings')}
        </NavLink>
        <button className="logout" onClick={handleLogout}>
          <LogOut />
          {t('profile-links-logout')}
        </button>
      </div>
    </nav>
  )
}

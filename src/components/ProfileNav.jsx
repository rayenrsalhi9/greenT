import { NavLink } from "react-router-dom"
import userIcon from '../assets/profile.png'

import overviewIcon from '../assets/overview.png'
import postIcon from '../assets/posts.png'
import pointsIcon from '../assets/change.png'
import settingsIcon from '../assets/settings.png'
import logoutIcon from '../assets/logout.png'

import '../styles/ProfileNav.css'

export default function ProfileNav({profile}) {
  return (
    <nav className="profile-navbar">

      <div className="profile-info">

        <img src={userIcon} alt="profile image" className="profile-pic" />

        <div className="profile-info-details">
          <h3> {profile.lastName} {profile.firstName} </h3>
          <p> {profile.email} </p>
          <span className="badge">Eco Warrior</span>
        </div>

      </div>

      <div className="navigation-links">
        <NavLink to="/profile" end>
          <img src={overviewIcon} alt="overview icon" loading="lazy" />
          Overview
        </NavLink>
        <NavLink to="posts">
          <img src={postIcon} alt="post icon" loading="lazy" />
          Posted Plastics
        </NavLink>
        <NavLink to="points">
          <img src={pointsIcon} alt="points icon" />
          Points
        </NavLink>
        <NavLink to="settings">
          <img src={settingsIcon} alt="settings icon" />
          Settings
        </NavLink>
        <NavLink to="/logout" className="logout">
          <img src={logoutIcon} alt="logout icon" />
          Log out
        </NavLink>
      </div>
    </nav>
  )
}

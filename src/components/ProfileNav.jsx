import { NavLink } from "react-router-dom"
import userIcon from '../assets/profile.png'
import '../styles/ProfileNav.css'

export default function ProfileNav() {
  return (
    <nav className="profile-navbar">

      <div className="profile-info">

        <img src={userIcon} alt="profile image" className="profile-pic" />

        <div className="profile-info-details">
          <h3>Essalhi Rayene</h3>
          <p>rayene.salhi@gmail.com</p>
          <span className="badge">Eco Warrior</span>
        </div>

      </div>

      <div className="navigation-links">
        <NavLink to="/profile" end>Overview</NavLink>
        <NavLink to="/posted-plastics">Posted Plastics</NavLink>
        <NavLink to="/points">Points</NavLink>
        <NavLink to="settings">Settings</NavLink>
        <NavLink to="/logout" className="logout">Logout</NavLink>
      </div>
    </nav>
  )
}

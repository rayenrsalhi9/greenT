import { Link, NavLink } from 'react-router-dom'
import appIcon from '../assets/login-icon.png'
import userIcon from '../assets/user.png'
import '../styles/Navbar.css'

export default function Navbar() {
    return (
        <nav>
            <Link to="/" className="logo">
                <img src={appIcon} alt="app icon" />
                <span>GreenT</span>
            </Link>

            <div className="nav">
                <NavLink to="/find">Find Plastics</NavLink>
                <NavLink to="/post">Post Plastics</NavLink>
                <NavLink to="/how">How It Works</NavLink>
                <NavLink to="/about">About GreenT</NavLink>
            </div>

            <Link to="/profile" className='user-icon'>
                <img src={userIcon} alt="user icon" />
            </Link> 
        </nav>
    )
}

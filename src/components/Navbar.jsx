import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'

import appIcon from '../assets/login-icon.png'
import userIcon from '../assets/user.png'

import menuIcon from '../assets/menu-burger.png'
import closeMenuOpen from '../assets/cross.png'

import '../styles/Navbar.css'

export default function Navbar() {
    const [isMenuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen)
    }

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

            <button className="mobile-menu-icon" onClick={toggleMenu}>
                
                {
                    isMenuOpen ?
                    <img src={closeMenuOpen} alt="close menu icon" /> :
                    <img src={menuIcon} alt="mobile menu icon" />
                }

                {
                    isMenuOpen &&
                    <div className="mobile-menu">
                        <Link to="">Profile</Link>
                        <Link to="">Find Plastics</Link>
                        <Link to="">Post Plastics</Link>
                        <Link to="">How It Works</Link>
                        <Link to="about">About GreenT</Link>
                    </div>
                }
            </button>

            
        </nav>
    )
}

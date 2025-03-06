import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'

import appIcon from '../assets/page-icon.png'
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
        <nav className='home-navbar'>
            <Link to="/" className="logo">
                <img src={appIcon} alt="app icon" />
                <span>GreenT</span>
            </Link>

            <div className="nav">
                <NavLink to="posts">Find Plastics</NavLink>
                <NavLink to="newPost">Post Plastics</NavLink>
                <NavLink to="howToUse">How It Works</NavLink>
                <NavLink to="about">About GreenT</NavLink>
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
                        <Link to="profile">Profile</Link>
                        <Link to="posts">Find Plastics</Link>
                        <Link to="newPost">Post Plastics</Link>
                        <Link to="howToUse">How It Works</Link>
                        <Link to="about">About GreenT</Link>
                    </div>
                }
            </button>

            
        </nav>
    )
}

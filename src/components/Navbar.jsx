import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'

import { useTranslation } from 'react-i18next'

import appIcon from '../assets/page-icon.png'
import userIcon from '../assets/user.png'
import menuIcon from '../assets/menu-burger.png'
import closeMenuOpen from '../assets/cross.png'

import profile from '../assets/mobile-nav/profile.png'
import findPost from '../assets/mobile-nav/search.png'
import addPost from '../assets/mobile-nav/new-post.png'
import about from '../assets/mobile-nav/about.png'
import how from '../assets/mobile-nav/how.png'

import '../styles/Navbar.css'

export default function Navbar() {

    const { t } = useTranslation()
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
                <NavLink to="posts">{t('navbar-find-plastics')}</NavLink>
                <NavLink to="newPost">{t('navbar-post-plastics')}</NavLink>
                <NavLink to="howToUse">{t('navbar-how-it-works')}</NavLink>
                <NavLink to="about">{t('navbar-about')}</NavLink>
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
                        <Link to="profile">
                            <img src={profile} alt="profile icon" loading='lazy' />
                            {t('navbar-profile')}
                        </Link>
                        <Link to="posts">
                            <img src={findPost} alt="find post icon" loading='lazy' />
                            {t('navbar-find-plastics')}
                        </Link>
                        <Link to="newPost">
                            <img src={addPost} alt="add post icon" loading='lazy' />
                            {t('navbar-post-plastics')}
                        </Link>
                        <Link to="howToUse">
                            <img src={how} alt="how to use icon" loading='lazy' />
                            {t('navbar-how-it-works')}
                        </Link>
                        <Link to="about">
                            <img src={about} alt="about icon" loading='lazy'/>
                            {t('navbar-about')}
                        </Link>
                    </div>
                }
            </button>

            
        </nav>
    )
}

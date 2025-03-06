import { Link } from 'react-router-dom'

import logo from '../assets/page-icon.png'

import homeImg from '../assets/homepage.png'
import aboutImg from '../assets/about.png'
import contactImg from '../assets/admin.png'

import facebookImg from '../assets/facebook.png'
import twitterImg from '../assets/twitter.png'
import instagramImg from '../assets/instagram.png'

import './footer.css'

export default function Footer() {
    return (
        <footer>
            <div className="footer-content">
                <div className="footer-pattern-top"></div>
                <div className="footer-sections">
                    <div className="section">
                        <div className="logo">
                            <img src={logo} alt="Greent Logo" />
                            <h3>Greent</h3>
                        </div>
                        <p>
                            Connecting people to make recycling easier and more accessible. Join our community and help create a more sustainable future.
                        </p>
                    </div>
                    <div className="section">
                        <h3>Quick Links</h3>
                        <div className="links-section">
                            <Link to="/">
                                <img src={homeImg} alt="Home" />
                                Home
                            </Link>
                            <Link to="/about">
                                <img src={aboutImg} alt="About" />
                                About
                            </Link>
                            <Link to="/contact">
                                <img src={contactImg} alt="Contact" />
                                Contact Admin
                            </Link>
                        </div>
                    </div>
                    <div className="section">
                        <h3>Follow Us</h3>
                        <div className="social-section">
                            <Link to="/">
                                <img src={facebookImg} alt="Facebook" />
                                Facebook
                            </Link>
                            <Link to="/">
                                <img src={twitterImg} alt="Twitter" />
                                Twitter
                            </Link>
                            <Link to="/">
                                <img src={instagramImg} alt="Instagram" />
                                Instagram
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="copyright-section">
                    <p>
                        &copy; {new Date().getFullYear()} Greent. All rights reserved.
                    </p>
                </div>
                <div className="footer-pattern-bottom"></div>
            </div>
        </footer>
    )
}

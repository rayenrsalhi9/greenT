import { Link } from 'react-router-dom'
import homePageImg from '../assets/home-img.jpg'
import '../styles/Home.css'

export default function Home() {
  return (
    <section className="home container">
        <div className="hero-section">
            <div className="hero-content">
                <h1>
                    Connect, Recycle, <span>Impact</span>
                </h1>
                <p>
                    Join EcoClean and be part of a community dedicated to reducing plastic waste. Connect with like-minded
                    individuals, exchange plastics, and make a real difference.
                </p>
                <Link to="/" className='plastics-link-btn'>
                    Get Started
                </Link>
            </div>
            <div className="hero-image">
                <img src={homePageImg} alt="home page image" />
            </div>
        </div>
        <div className="nav-section">
            <h2>Ready to Make a Difference?</h2>
            <p>Join GreenT today and start your journey towards a plastic-free future.</p>
            <div className="buttons-section">
                <Link to="/signup" className='signup-link'>Sign Up Now</Link>
                <Link to="/" className='about-link'>About the App</Link>
            </div>
        </div>
    </section>
  )
}

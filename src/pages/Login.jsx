import { Link } from 'react-router-dom';
import loginIcon from '../assets/login-icon.png'
import GoogleIcon from '../components/GoogleIcon'
import '../styles/Login.css';

export default function Login() {
  return (
    <section className="login-container">
        <img src={loginIcon} alt="login icon" loading='lazy' />
        <h1>Welcome to GreenT</h1>
        <p>Join the movement to clean our planet</p>
        <form className='login-form'>
            <div className="row">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
            </div>
            <div className="row">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
            </div>
            <button>Sign in</button>
        </form>
        <div className="divider">
            <span className="divider-text">or continue with</span>
        </div>
        <button className='google-signin-btn'>
            <GoogleIcon />
            <span>Sign in with Google</span>
        </button>
        <div className="signup-prompt">
            Don't have an account? 
            <Link to="/signup" className='signup-link'>Create one now</Link>
        </div>
    </section>
  )
}

import signupIcon from '../assets/login-icon.png'
import '../styles/Signup.css'

export default function Signup() {
  return (
    <section className="signup-container">

        <img src={signupIcon} alt="login icon" loading='lazy' />
        <h1>Join GreenT</h1>
        <p>Sign up to start cleaning our planet</p>

        <form className='signup-form'>
            <div className="form-group">
                <div className="form-row">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" id="firstName" />
                </div>
                <div className="form-row">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" id="lastName" />
                </div>
            </div>
            <div className="form-row">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
            </div>
            <div className="form-row">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
            </div>
            <div className="form-row">
                <label htmlFor="city">City of Residence</label>
                <input type="text" name="city" id="city" />
            </div>
            <div className="form-row">
                <label htmlFor="phone">Phone Number</label>
                <input type="text" name="phone" id="phone" />
            </div>
            <button>Sign up</button>
        </form>
        <div className="login-prompt">
            Already have an account? 
            <a href='#' className='login-link'>Log in here</a>
        </div>
    </section>
  )
}

import { 
    Link,
    Form,
    useNavigate,
    redirect
} from 'react-router-dom';

import { googleLogin } from '../firebase/googleLogin';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getLoginErrorMessage } from '../firebase/errorMsgs';
import { auth } from '../config/firebase';

import loginIcon from '../assets/login-icon.png'
import GoogleIcon from '../components/GoogleIcon'

import '../styles/Login.css';

export async function action({ request }) {
    const formData = await request.formData()
    const email = formData.get('email')
    const password = formData.get('password')

    const pathname = new URL(request.url).searchParams.get('pathname') || '/profile'

    if (!email || !password) return 'All fields are required'

    try {
        await signInWithEmailAndPassword(auth, email, password)
        return redirect(pathname)
    } catch (err) {
        return getLoginErrorMessage(err.code)
    }
}

export default function Login() {

    const navigate = useNavigate()

    const handleGoogleLogin = async () => {
        await googleLogin(navigate)
    }

  return (
    <section className="login-container">
        <img src={loginIcon} alt="login icon" loading='lazy' />
        <h1>Welcome to GreenT</h1>
        <p>Join the movement to clean our planet</p>
        <p className="error-msg">You need to log in to procced.</p>
        <Form replace method='post' className='login-form' >
            <div className="row">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
            </div>
            <div className="row">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
            </div>
            <p className="error-msg">An error occured, try again.</p>
            <button>Sign in</button>
        </Form>
        <div className="divider">
            <span className="divider-text">or continue with</span>
        </div>
        <button className='google-signin-btn' onClick={handleGoogleLogin}>
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

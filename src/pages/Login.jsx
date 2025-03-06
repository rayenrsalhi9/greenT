import { 
    Link,
    Form,
    useNavigate,
    redirect,
    useActionData,
    useSearchParams,
    useNavigation
} from 'react-router-dom';

import { googleLogin } from '../firebase/googleLogin';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getLoginErrorMessage } from '../firebase/errorMsgs';
import { auth } from '../config/firebase';

import helloIcon from '../assets/hello.gif'
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

    const errorMsg = useActionData()
    const [searchParams] = useSearchParams()
    const navigation = useNavigation()

  return (
    <div className="login-outer-container">
        <section className="login-container">
            <img src={helloIcon} alt="hello icon" loading='lazy' />
            <h1>Hi again!</h1>
            <p> Login to continue cleaning our planet </p>

            {
                searchParams && 
                <p className="error-msg">{searchParams.get('message')}</p>
            }

            <Form replace method='post' className='login-form' >
                <div className="row">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div className="row">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" />
                </div>
                { errorMsg && <p className="error-msg">{errorMsg}</p>}
                <button disabled={navigation.state === 'submitting'}>
                    {
                        navigation.state === 'submitting' ?
                        'Signing in...' : 'Sign in'
                    }
                </button>
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
    </div>
  )
}

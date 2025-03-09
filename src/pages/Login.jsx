import { 
    Link,
    Form,
    useNavigate,
    redirect,
    useActionData,
    useSearchParams,
    useNavigation
} from 'react-router-dom';

import { useTranslation } from 'react-i18next';

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

    const { t } = useTranslation()

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
            <h1>{t('login-form-title')}</h1>
            <p>{t('login-form-description')}</p>

            {
                searchParams && 
                <p className="error-msg">{searchParams.get('message')}</p>
            }

            <Form replace method='post' className='login-form' >
                <div className="row">
                    <label htmlFor="email">{t('login-form-email')}</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div className="row">
                    <label htmlFor="password">{t('login-form-password')}</label>
                    <input type="password" name="password" id="password" />
                </div>
                { errorMsg && <p className="error-msg">{errorMsg}</p>}
                <button disabled={navigation.state === 'submitting'}>
                    {
                        navigation.state === 'submitting' ?
                        t('login-form-button-submitting') : t('login-form-button')
                    }
                </button>
            </Form>
            <div className="divider">
                <span className="divider-text">{t('login-form-divider')}</span>
            </div>
            <button className='google-signin-btn' onClick={handleGoogleLogin}>
                <GoogleIcon />
                <span>{t('login-form-google')}</span>
            </button>
            <div className="signup-prompt">
                {t('login-form-signup')} 
                <Link to="/signup" className='signup-link'>{t('login-form-link')}</Link>
            </div>
        </section>
    </div>
  )
}

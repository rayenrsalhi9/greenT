import { Link, Form, redirect, useNavigation, useActionData } from 'react-router-dom'
import { auth, db } from '../config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { getSignUpErrorMessage } from '../firebase/signupErrorMsgs'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

import { useTranslation } from 'react-i18next'

import greetIcon from '../assets/greet.gif'
import '../styles/Signup.css'

export async function action({ request }) {
    const formData = await request.formData()
    const password = formData.get('password')
    const { firstName, lastName, email, city, phone } = Object.fromEntries(formData)

    if (!firstName || !lastName || !email || !password || !city || !phone) {
        return "All fields are required!"
    }

    try {
        const userData = await createUserWithEmailAndPassword(auth, email, password)
        const user = userData.user

        await setDoc(doc(db, "users", user.uid), {
            firstName,
            lastName,
            email,
            city,
            phone,
            createdAt: serverTimestamp(),
            points: 0,
            badge: 'Eco Newbie'
        })
        return redirect('/profile')
    } catch(err) {
        return getSignUpErrorMessage(err.code)
    }
}

export default function Signup() {

    const { t } = useTranslation()

    const navigation = useNavigation()
    const errorMsg = useActionData()

    return (
        <div className="signup-outer-container">
            <section className="signup-container">

                <img src={greetIcon} alt="greet icon" loading='lazy' />
                <h1>{t('signup-form-title')}</h1>
                <p>{t('signup-form-description')}</p>

                <Form method='post' replace className='signup-form' >
                    <div className="form-group">
                        <div className="form-row">
                            <label htmlFor="firstName">{t('signup-form-fname')}</label>
                            <input type="text" name="firstName" id="firstName" />
                        </div>
                        <div className="form-row">
                            <label htmlFor="lastName">{t('signup-form-lname')}</label>
                            <input type="text" name="lastName" id="lastName" />
                        </div>
                    </div>
                    <div className="form-row">
                        <label htmlFor="email">{t('signup-form-email')}</label>
                        <input type="email" name="email" id="email" />
                    </div>
                    <div className="form-row">
                        <label htmlFor="password">{t('signup-form-password')}</label>
                        <input type="password" name="password" id="password" />
                    </div>
                    <div className="form-row">
                        <label htmlFor="city">{t('signup-form-city')}</label>
                        <input type="text" name="city" id="city" />
                    </div>
                    <div className="form-row">
                        <label htmlFor="phone">{t('signup-form-phone')}</label>
                        <input type="text" name="phone" id="phone" />
                    </div>

                    { errorMsg && <p className="error-msg"> {errorMsg} </p> }

                    <button disabled={navigation.state === 'submitting'}>
                        {
                            navigation.state === 'submitting' ?
                            t('signup-form-button-submitting') : t('signup-form-button')
                        }
                    </button>
                </Form>
                <div className="login-prompt">
                    {t('signup-form-login')} 
                    <Link to="/login" className='login-link'>{t('signup-form-link')}</Link>
                </div>
            </section>
        </div>
    )
}

/* eslint-disable react-refresh/only-export-components */
import { Link, Form, redirect, useNavigation, useActionData } from 'react-router-dom'
import { auth, db } from '../config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { getSignUpErrorMessage } from '../firebase/signupErrorMsgs'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { assignObjectives } from '../firebase/getProfile'
import { useState } from 'react'
import { states, cities } from '../utils/locations'
import { useTranslation } from 'react-i18next'

import greetIcon from '../assets/greet.gif'
import '../styles/Signup.css'

export async function action({ request }) {
    const formData = await request.formData()
    const password = formData.get('password')
    const { firstName, lastName, email, city, phone, state } = Object.fromEntries(formData)

    if (!firstName || !lastName || !email || !password || !city || !phone || !state) {
        return "All fields are required!"
    }

    try {
        const userData = await createUserWithEmailAndPassword(auth, email, password)
        const user = userData.user

        await Promise.all([
            setDoc(doc(db, 'users', user.uid), {
                firstName,
                lastName,
                email,
                city: `${city} - ${state}`,
                phone,
                badge: 'Eco-Newbie',
                points: 0,
                createdAt: serverTimestamp(),
            })
            .then(() => assignObjectives(user.uid))
            .catch(err => {
                console.log(err)
                return {
                    message: 'Failed to assign objectives',
                    status: err.status,
                    statusText: err.statusText
                }
            })
        ])
        
        return redirect('/profile')

    } catch(err) {
        return getSignUpErrorMessage(err.code)
    }
}

export default function Signup() {
    const { t } = useTranslation()

    const navigation = useNavigation()
    const errorMsg = useActionData()

    const [selectedState, setSelectedState] = useState(null)
    const [, setSelectedCity] = useState(null)

    const handleStateChange = (e) => {
        setSelectedState(e.target.value)
    }

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value)
    }

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
                    <div className="form-group">
                        <div className="form-row">
                            <label htmlFor="state">{t('new-post-post-state')}</label>
                            <select name="state" id="state" onChange={handleStateChange}>
                                <option value="">{t('new-post-post-state-placeholder')}</option>
                                {
                                    states.map((state) => (
                                        <option value={state.id} key={state.id}>{t(`states.${state.id}`)}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="form-row">
                            <label htmlFor="city">{t('new-post-post-city')}</label>
                            <select name="city" id="city" onChange={handleCityChange}>
                                <option value="">{t('new-post-post-city-placeholder')}</option>
                                {
                                    selectedState && cities[selectedState].map((city) => (
                                        <option value={city} key={city}>{t(`cities.${selectedState}.${city}`)}</option>
                                    ))
                                }
                            </select>
                        </div>
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
                    <Link to="/login" className='login-link'>{t('login-form-link')}</Link>
                </div>
            </section>
        </div>
    )
}

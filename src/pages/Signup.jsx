import { Link, Form, redirect, useNavigation, useActionData } from 'react-router-dom'
import { auth, db } from '../config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { getSignUpErrorMessage } from '../firebase/signupErrorMsgs'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

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

    const navigation = useNavigation()
    const errorMsg = useActionData()

    return (
        <div className="signup-outer-container">
            <section className="signup-container">

                <img src={greetIcon} alt="greet icon" loading='lazy' />
                <h1>Join GreenT</h1>
                <p>Sign up to join the movement to clean our planet</p>

                <Form method='post' replace className='signup-form' >
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

                    { errorMsg && <p className="error-msg"> {errorMsg} </p> }

                    <button disabled={navigation.state === 'submitting'}>
                        {
                            navigation.state === 'submitting' ?
                            'Signing up...' : 'Sign up'
                        }
                    </button>
                </Form>
                <div className="login-prompt">
                    Already have an account? 
                    <Link to="/login" className='login-link'>Log in here</Link>
                </div>
            </section>
        </div>
    )
}

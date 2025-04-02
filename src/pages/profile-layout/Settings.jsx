/* eslint-disable react-refresh/only-export-components */
import { useOutletContext, Form, redirect, useNavigation, useActionData } from 'react-router-dom'
import { auth, db } from '../../config/firebase'
import { doc, updateDoc } from 'firebase/firestore'

import { useTranslation } from 'react-i18next'

import '../../styles/profile-layout/Settings.css'

export async function action({ request }) {
    const formData = await request.formData()
    const { firstName, lastName, phone } = Object.fromEntries(formData)

    if (!phone || !firstName || !lastName) return 'All fields are required'
    
    const docRef = doc(db, "users", auth.currentUser.uid)

    try {
        await updateDoc(docRef, {
            phone,
            firstName,
            lastName
        })
        return redirect('/profile')
    } catch(err) {
        return err
    }
}

export default function Settings() {
    const { t } = useTranslation()

    const profile = useOutletContext()
    const errorMsg = useActionData()
    const navigation = useNavigation()

    return (
        <section className="settings-container">
            <div className="settings">
                <div className="titles">
                    <h1>{t('account-settings-title')}</h1>
                    <p>{t('account-settings-description')}</p>
                </div>
                <Form replace method='post' className="personal-info">
                    <h3>{t('account-settings-personal-info')}</h3>
                    <div className="row">
                        <div className="group">
                            <label htmlFor="firstName">{t('account-settings-fname')}</label>
                            <input 
                                type="text" 
                                name='firstName' 
                                id='firstName' 
                                defaultValue={profile.firstName} 
                            />
                        </div>
                        <div className="group">
                            <label htmlFor="lastName">{t('account-settings-lname')}</label>
                            <input 
                                type="text" 
                                name='lastName' 
                                id='lastName' 
                                defaultValue={profile.lastName} 
                            />
                        </div>
                    </div>
                    <div className="group">
                        <label htmlFor="phone">{t('account-settings-phone')}</label>
                        <input 
                            type="text" 
                            name='phone' 
                            id='phone' 
                            defaultValue={profile.phone}
                        />
                    </div>
                
                    { errorMsg && <p className="error-msg"> {errorMsg} </p> }

                    <button disabled={navigation.state === 'submitting'}>
                        {
                            navigation.state === 'submitting' ?
                            t('account-settings-saving') : t('account-settings-save')
                        }
                    </button>
                </Form>
            </div>
        </section>
    )
}

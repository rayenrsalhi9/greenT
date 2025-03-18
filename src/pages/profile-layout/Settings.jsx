/* eslint-disable react-refresh/only-export-components */
import { useOutletContext, Form, redirect, useNavigation, useActionData } from 'react-router-dom'
import { auth, db } from '../../config/firebase'
import { doc, updateDoc } from 'firebase/firestore'

import { states, cities } from '../../utils/locations'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import '../../styles/profile-layout/Settings.css'

export async function action({ request }) {
    const formData = await request.formData()
    const { firstName, lastName, city, phone, state } = Object.fromEntries(formData)

    if (!city || !phone || !firstName || !lastName || !state) return 'All fields are required'
    
    const docRef = doc(db, "users", auth.currentUser.uid)

    try {
        await updateDoc(docRef, {
            city: `${state} - ${city}`,
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
    console.log(auth.currentUser)

    const [selectedState, setSelectedState] = useState("")
    const [, setSelectedCity] = useState("")

    const handleStateChange = (e) => {
        setSelectedState(e.target.value)
    }

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value)
    }

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
                        <label htmlFor="city">{t('account-settings-city')}</label>
                        <div className="group">
                            <select name="state" id="state" onChange={handleStateChange}>
                                <option value="">{t('account-settings-state-placeholder')}</option>
                                {
                                    states.map((state) => (
                                        <option value={state.id} key={state.id}>{t(`states.${state.id}`)}</option>
                                    ))
                                }
                            </select>       
                            <select name="city" id="city" onChange={handleCityChange}>
                                <option value="">{t('account-settings-city-placeholder')}</option>
                                {
                                    selectedState && cities[selectedState].map((city) => (
                                        <option value={city} key={city}>{t(`cities.${selectedState}.${city}`)}</option>
                                    ))
                                }
                            </select>
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

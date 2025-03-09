/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react'
import { auth } from '../../config/firebase'
import { redirect, Form, useActionData, useNavigation } from 'react-router-dom'

import { useTranslation } from 'react-i18next'
import { serverTimestamp } from 'firebase/firestore'

import { states, cities } from '../../utils/locations'
import { sharePost } from '../../firebase/sharePost'

import bottle from '../../assets/bottle.png'
import bag from '../../assets/bag.png'
import mixed from '../../assets/mixedMaterial.png'

import '../../styles/plastic/NewPost.css'

export function loader() {
    return new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                resolve(redirect('/login?message=You have to log in to proceed'));
            } else {
                resolve(null);
            }
            unsubscribe();
        });
    });
}

export async function action({request}) {
  const formData = await request.formData()
  const { title, state, city, description, bottles, bags, mixed } = Object.fromEntries(formData)
  
  if (!title || !state || !city || !description || !bottles || !bags || !mixed) {
    return 'All fields are required'
  }

  const postAttributes = {
    userID: auth.currentUser.uid,
    title, state, city, description, 
    bottles: Number(bottles), 
    bags: Number(bags), 
    mixed: Number(mixed),
    createdAt: serverTimestamp()
  }

  return sharePost(postAttributes)
}

export default function NewPost() {
  const { t } = useTranslation()
  const [, setSelectedState] = useState("")
  const [availablesCities, setCities] = useState([])

  const errorMessage = useActionData()
  const navigation = useNavigation()

  const handleStateChange = (e) => {
    const stateId = e.target.value
    setSelectedState(stateId)
    setCities(cities[stateId] || [])
  }

  return (
    <div className="post-form-container">
      <Form  method='post' replace className="post-form">
        <h1 className="form-title">{t('new-post-title')}</h1>

        <div className="form-group">
          <label htmlFor="title">{t('new-post-post-title')}</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder={t('new-post-post-title-placeholder')} 
          />
        </div>

        <div className="location-group">
          <div className="form-group">
            <label htmlFor="state">{t('new-post-post-state')}</label>
            <select id="state" name="state" onChange={handleStateChange}>
              <option value="">{t('new-post-post-state-placeholder')}</option>
              {
                states.map(state => (
                  <option key={state.id} value={state.id} > {state.name} </option>
                ))
              }
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="city">{t('new-post-post-city')}</label>
            <select id="city" name="city"> 
              <option value="">{t('new-post-post-city-placeholder')}</option>
              {
                availablesCities.map((el, index) => (
                  <option key={index} value={el} > {el} </option>
                ))
              }
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">{t('new-post-post-description')}</label>
          <textarea
            id="description"
            name="description"
            placeholder={t('new-post-post-description-placeholder')}
          />
        </div>

        <div className="items-count-group">
          <div className="count-item">
            <div className="icon-container">
              <img src={bottle} alt="bottle icon" />
            </div>
            <label htmlFor="bottles">{t('new-post-post-bottles')}</label>
            <input
              type="number"
              id="bottles"
              name="bottles"
              min="0"
            />
          </div>

          <div className="count-item">
            <div className="icon-container">
              <img src={bag} alt="bag icon" />
            </div>
            <label htmlFor="bags">{t('new-post-post-bags')}</label>
            <input
              type="number"
              id="bags"
              name="bags"
              min="0"
            />
          </div>

          <div className="count-item">
            <div className="icon-container">
              <img src={mixed} alt="mixed materials icon" />
            </div>
            <label htmlFor="mixed">{t('new-post-post-mixed')}</label>
            <input
              type="number"
              id="mixed"
              name="mixed"
              min="0"
            />
          </div>
        </div>

        {errorMessage && <h3 className='error-msg'>{errorMessage}</h3>}

        <button 
          type="submit" 
          className="submit-button"
          disabled={navigation.state === 'submitting'}
        >
          {navigation.state === 'submitting' ? t('new-post-post-button-submitting') : t('new-post-post-button')}
        </button>
      </Form>
    </div>
  )
}

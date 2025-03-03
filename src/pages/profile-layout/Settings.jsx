import { useOutletContext, Form, redirect, useNavigation, useActionData } from 'react-router-dom'
import { auth, db } from '../../config/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import '../../styles/profile-layout/Settings.css'

export async function action({ request }) {
    const formData = await request.formData()
    const { firstName, lastName, city, phone } = Object.fromEntries(formData)

    if (!city || !phone || !firstName || !lastName) return 'All fields are required'
    
    const docRef = doc(db, "users", auth.currentUser.uid)

    try {
        await updateDoc(docRef, {
            city,
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
    const profile = useOutletContext()
    const errorMsg = useActionData()
    const navigation = useNavigation()

    return (
        <section className="settings-container">
            <div className="settings">
                <div className="titles">
                    <h1>Account Settings</h1>
                    <p>Manage your profile and preferences</p>
                </div>
                <Form replace method='post' className="personal-info">
                    <h3>Personal informations</h3>
                    <div className="row">
                        <div className="group">
                            <label htmlFor="firstName">First Name</label>
                            <input 
                                type="text" 
                                name='firstName' 
                                id='firstName' 
                                defaultValue={profile.firstName} 
                            />
                        </div>
                        <div className="group">
                            <label htmlFor="lastName">Last Name</label>
                            <input 
                                type="text" 
                                name='lastName' 
                                id='lastName' 
                                defaultValue={profile.lastName} 
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="group">
                            <label htmlFor="city">City Of Residence</label>
                            <input 
                                type="text" 
                                name='city' 
                                id='city' 
                                defaultValue={profile.city}
                            />
                        </div>
                        <div className="group">
                            <label htmlFor="phone">Phone Number</label>
                            <input 
                                type="text" 
                                name='phone' 
                                id='phone' 
                                defaultValue={profile.phone}
                            />
                        </div>
                    </div>
                
                    { errorMsg && <p className="error-msg"> {errorMsg} </p> }

                    <button disabled={navigation.state === 'submitting'}>
                        {
                            navigation.state === 'submitting' ?
                            'Saving changes...' : 'Save Changes'
                        }
                    </button>
                </Form>
            </div>
        </section>
    )
}

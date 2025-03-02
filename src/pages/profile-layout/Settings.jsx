import { useOutletContext } from 'react-router-dom'
import '../../styles/profile-layout/Settings.css'

export default function Settings() {
    const profile = useOutletContext()

    return (
        <section className="settings-container">
            <div className="settings">
                <div className="titles">
                    <h1>Account Settings</h1>
                    <p>Manage your profile and preferences</p>
                </div>
                <div className="personal-info">
                    <h3>Personal informations</h3>
                    <div className="row">
                        <div className="group">
                            <label htmlFor="firstName">First Name</label>
                            <input 
                                type="text" 
                                name='firstName' 
                                id='firstName' 
                                value={profile.firstName} 
                            />
                        </div>
                        <div className="group">
                            <label htmlFor="lastName">Last Name</label>
                            <input 
                                type="text" 
                                name='lastName' 
                                id='lastName' 
                                value={profile.lastName} 
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
                                value={profile.city}
                            />
                        </div>
                        <div className="group">
                            <label htmlFor="phone">Phone Number</label>
                            <input 
                                type="text" 
                                name='phone' 
                                id='phone' 
                                value={profile.phone}
                            />
                        </div>
                    </div>
                </div>
                <button>Save Changes</button>
            </div>
        </section>
    )
}

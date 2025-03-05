import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import userIcon from '../../assets/profile.png'

import { showContacts } from '../../firebase/showContacts'
import { auth } from '../../config/firebase'

import './messages.css'

export default function Messages() {

    const [contacts, setContacts] = useState([])

    useEffect(() => {
        const fetchContacts = async () => {
            const contacts = await showContacts(auth.currentUser.uid)
            setContacts(contacts)
        }
        fetchContacts()
    }, [])

    return (
        <div className="messages-container">
            <h2>My Messages</h2>
            <div className="contacts-list">
                {contacts.map(contact => (
                    <Link 
                        to={`./${contact.id}`}
                        key={contact.id}
                        className="contact-item"
                    >
                        <img 
                            src={userIcon} 
                            alt='contact avatar'
                            className="contact-avatar"
                        />
                        <div className="contact-info">
                            <h3>{contact.firstName} {contact.lastName}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

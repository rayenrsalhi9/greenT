import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import userIcon from '../../assets/profile.png'
import noContacts from '../../assets/empty-message.gif'

import { showContacts } from '../../firebase/showContacts'
import { auth } from '../../config/firebase'
import { formatTime } from '../../utils/formatTime'

import './messages.css'

export default function Messages() {

    const [contacts, setContacts] = useState(null)

    useEffect(() => {
        const fetchContacts = async () => {
            const contacts = await showContacts(auth.currentUser.uid)
            setContacts(contacts)
        }
        fetchContacts()
    }, [])

    return (
        <div className="messages-container">
            <h2>My Messages {contacts && <span>({contacts.length})</span>}</h2>
            <div className="contacts-list">
                {
                    contacts &&
                        contacts.map(contact => (
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
                                    <div className="message-info">
                                        <p>{contact.lastMessage}</p>
                                        <span>{formatTime(contact.lastMessageTime)}</span>
                                    </div>
                                </div>
                            </Link>
                        )) 
                }
            </div>
            {
                !contacts && 
                <h3 className='loading'>Loading...</h3>
            }
            {
                contacts && contacts.length === 0 && 
                <h3 className='no-contacts'>
                    <img src={noContacts} alt="no contacts" />
                    <p>No contacts found</p>
                </h3>
            }
        </div>
    )
}

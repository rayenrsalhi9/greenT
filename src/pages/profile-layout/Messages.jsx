
import { Link } from 'react-router-dom'
import userIcon from '../../assets/profile.png'

import './messages.css'

export default function Messages() {


    // Example contacts data
    const contacts = [
        {
            id: "user1",
            firstName: "John",
            lastName: "Doe",
            lastMessage: "Hey, are the bottles still available?",
            timestamp: "2 hours ago"
        },
        {
            id: "user2", 
            firstName: "Sarah",
            lastName: "Smith",
            lastMessage: "Thanks for the quick response!",
            timestamp: "5 hours ago"
        },
        {
            id: "user3",
            firstName: "Mike",
            lastName: "Johnson",
            lastMessage: "I can pick up tomorrow",
            timestamp: "1 day ago"
        },
        {
            id: "user4",
            firstName: "Emily",
            lastName: "Brown",
            lastMessage: "Perfect, see you then!",
            timestamp: "2 days ago"
        },
        {
            id: "user5",
            firstName: "David",
            lastName: "Wilson",
            lastMessage: "Is the price negotiable?",
            timestamp: "3 days ago"
        }
    ]

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
                            alt={`${contact.firstName} ${contact.lastName}`}
                            className="contact-avatar"
                        />
                        <div className="contact-info">
                            <h3>{contact.firstName} {contact.lastName}</h3>
                            <p className="last-message">{contact.lastMessage}</p>
                            <span className="timestamp">{contact.timestamp}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

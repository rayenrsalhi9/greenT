import { useEffect, useState } from 'react'
import { Form, useSearchParams } from 'react-router-dom'

import { formatTime } from '../../utils/formatTime'
import { displayMsgs } from '../../firebase/displayMsgs'

import { auth } from '../../config/firebase'

import '../../styles/plastic/Messages.css'

export default function Messages() {

    const [searchParams] = useSearchParams()
    const senderID = auth.currentUser.uid
    const destinationID = searchParams.get('user')
    
    const [messages, setMessages] = useState(null)
    const [msg, setMsg] = useState('')

    const handleChange = (e) => {
        setMsg(e.target.value)
    }

    const clearField = () => {
        setMsg('')
    }

    useEffect( () => {
        const unsubscribe = displayMsgs(senderID, destinationID, setMessages)

        return () => unsubscribe()
    }, [senderID, destinationID]) 
    
    return (
        <section className="messages">
            <h2 className='title'>Messages</h2>
            <div className="messages-container">
                {   
                    messages ?
                    messages.map(msg => (
                        <div 
                            className={`message ${msg.senderID === auth.currentUser.uid ? "sent" : "received"}`} 
                            key={msg.id}
                        >
                            <div className="msg-bubble">
                                <p className="text">{msg.text}</p>
                                {
                                    msg.createdAt &&
                                    <span className="time">{formatTime(msg.createdAt.seconds)}</span>
                                }
                            </div>
                        </div>
                    )) : <h1>Loading...</h1>
                }
            </div>
            <Form method='post' onSubmit={clearField}>
                <input 
                    type="text" 
                    name='msg' 
                    id='msg' 
                    placeholder='Type your message...' 
                    value={msg}
                    onChange={handleChange}
                />
                <button>Send</button>
            </Form>
        </section>
    )
}

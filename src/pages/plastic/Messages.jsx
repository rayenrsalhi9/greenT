import { useEffect, useState } from 'react'
import { Form, useSearchParams } from 'react-router-dom'

import { formatTime } from '../../utils/formatTime'
import { displayMsgs } from '../../firebase/displayMsgs'

import '../../styles/plastic/Messages.css'
import { auth } from '../../config/firebase'

export default function Messages() {

    const [searchParams] = useSearchParams()
    const senderID = auth.currentUser.uid
    const destinationID = searchParams.get('user')
    
    const [messages, setMessages] = useState(null)

    useEffect( () => {
        async function getMsgs() {
            const msgs = await displayMsgs(senderID, destinationID)
            setMessages(msgs)
        }
        getMsgs()
    }, []) 
    
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
                                <span className="time">{formatTime(msg.createdAt.seconds)}</span>
                            </div>
                        </div>
                    )) : <h1>Loading...</h1>
                }
            </div>
            <Form method='post'>
                <input 
                    type="text" 
                    name='msg' 
                    id='msg' 
                    placeholder='Type your message...' 
                />
                <button>Send</button>
            </Form>
        </section>
    )
}

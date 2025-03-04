import { Form } from 'react-router-dom'

import { messages } from '../../utils/messages'
import '../../styles/plastic/Messages.css'

export default function Messages() {
  return (
    <section className="messages">
        <h2>Messages</h2>
        <div className="messages-container">
            {
                messages.map(msg => (
                    <div 
                        className={`message ${msg.sender === "you" ? "sent" : "received"}`} 
                        key={msg.id}
                    >
                        <div className="msg-bubble">
                            <p className="text">{msg.text}</p>
                            <span className="time">{msg.time}</span>
                        </div>
                    </div>
                ))
            }
        </div>
        <Form>
            <input type="text" placeholder='Type your message...' />
            <button>Send</button>
        </Form>
    </section>
  )
}

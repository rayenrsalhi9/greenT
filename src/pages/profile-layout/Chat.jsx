import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import userIcon from '../../assets/profile.png'
import './chat.css'

export default function Chat() {
    
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView()
  }

  useEffect(() => {
    scrollToBottom()
  }, [])

  return (
    <div className="chat-container">
        <Link to=".." relative="path" className="back-to-chats">
          Return to all chats
        </Link>
      <div className="chat">
        {/* Header Section */}
        <div className="chat-header">
          <img 
            src={userIcon} 
            alt="John Doe" 
            className="receiver-avatar"
          />
          <h3>Rayen Salhi</h3>
        </div>

        {/* Messages Section */}
        <div className="chat-messages">
          <div className="message received">
            <p>Hey, are the bottles still available?</p>
            <span className="message-time">2:30 PM</span>
          </div>

          <div className="message sent">
            <p>Yes, they are! When would you like to pick them up?</p>
            <span className="message-time">2:32 PM</span>
          </div>

          <div className="message received">
            <p>Great! Would tomorrow afternoon work?</p>
            <span className="message-time">2:33 PM</span>
          </div>

          <div className="message sent">
            <p>Perfect! I'm available after 2 PM. Does that work for you?</p>
            <span className="message-time">2:35 PM</span>
          </div>

          <div className="message received">
            <p>Yes, I can come by around 3 PM!</p>
            <span className="message-time">2:36 PM</span>
          </div>

          <div className="message sent">
            <p>Awesome! By the way, how many bottles do you need?</p>
            <span className="message-time">2:38 PM</span>
          </div>

          <div className="message received">
            <p>I'm looking for about 20 bottles if you have that many</p>
            <span className="message-time">2:40 PM</span>
          </div>

          <div className="message sent">
            <p>Yes, I actually have 30 bottles available!</p>
            <span className="message-time">2:41 PM</span>
          </div>

          <div className="message received">
            <p>That's perfect! Could I take all 30 then?</p>
            <span className="message-time">2:43 PM</span>
          </div>

          <div className="message sent">
            <p>Of course! I'll make sure they're all clean and ready for you</p>
            <span className="message-time">2:45 PM</span>
          </div>

          <div className="message received">
            <p>Thank you so much! Really appreciate it</p>
            <span className="message-time">2:46 PM</span>
          </div>

          <div className="message sent">
            <p>No problem at all! Happy to help reduce waste</p>
            <span className="message-time">2:48 PM</span>
          </div>

          <div className="message received">
            <p>Exactly! Do you need my contact number?</p>
            <span className="message-time">2:50 PM</span>
          </div>

          <div className="message sent">
            <p>Yes, that would be helpful just in case!</p>
            <span className="message-time">2:51 PM</span>
          </div>

          <div className="message received">
            <p>It's 555-0123. I'll see you tomorrow at 3!</p>
            <span className="message-time">2:53 PM</span>
          </div>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Section */}
        <div className="chat-input-container">
          <input 
            type="text" 
            placeholder="Type your message..." 
            className="chat-input"
            name='message'
            id='message'
          />
          <button className="send-button">
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

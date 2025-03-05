/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef, useState } from 'react'
import { Link, Form } from 'react-router-dom'
import { auth } from '../../config/firebase'

import userIcon from '../../assets/profile.png'
import leftArrow from '../../assets/left-arrow.png'

import { sendNewMessage, displayMessages, getChatId } from '../../firebase/messages'
import { formatTime } from '../../utils/formatTime'

import './chat.css'

export async function action({request}) {
  const receiverId = new URL(request.url).pathname.split('/').pop()
  const senderId = auth.currentUser.uid
  const formData = await request.formData()
  const message = formData.get('message')
  if (!message) return null
  
  await sendNewMessage(senderId, receiverId, message)

  return null
}

export default function Chat() {
  const messagesEndRef = useRef(null)
  const [message, setMessage] = useState('')

  const [chatId, setChatId] = useState(null)
  const receiverId = new URL(window.location.href).pathname.split('/').pop()
  const senderId = auth.currentUser.uid
  const [conversation, setConversation] = useState([])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView()
  }

  useEffect(() => {
    scrollToBottom()
  }, [])

  useEffect(() => {
    const fetchChatId = async () => {
      const chatId = await getChatId(senderId, receiverId)
      setChatId(chatId)
    }
    fetchChatId()
  }, [senderId, receiverId])

  useEffect(() => {
    if (chatId) {
      const fetchMessages = async () => {
        displayMessages(chatId, (messages) => {
          setConversation(messages)
        })
      }
      fetchMessages()
    }
  }, [chatId])

  const handleSubmit = () => {
    setMessage('')
  }

  return (
    <div className="chat-container">
        <Link to=".." relative="path" className="back-to-chats">
          <img src={leftArrow} alt="left-arrow" />
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
          {
            conversation.map((message) => (
              <div key={message.id} className={`message ${message.senderId === auth.currentUser.uid ? 'sent' : 'received'}`}>
                <p>{message.text}</p>
                <span className='message-time'> {formatTime(message.timestamp)} </span>
              </div>
            ))
          }
          <div ref={messagesEndRef} />
        </div>

        {/* Input Section */}
        <Form className="chat-input-container" method='post' onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Type your message..." 
            className="chat-input"
            name='message'
            id='message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="send-button">
            Send
          </button>
        </Form>
      </div>
    </div>
  )
}

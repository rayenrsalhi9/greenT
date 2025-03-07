import { 
    collection, 
    doc, 
    setDoc, 
    addDoc, 
    query, 
    where, 
    getDocs,
    serverTimestamp,
    orderBy,
    onSnapshot
} from 'firebase/firestore'
import { db } from '../config/firebase'

export async function sendNewMessage(senderID, receiverID, messageText) {
  try {
    // Create members array sorted to ensure consistent chat ID
    const members = [senderID, receiverID].sort()
    
    // Query chats collection to find existing chat between these users
    const chatsRef = collection(db, 'chats')
    const q = query(chatsRef, where('members', '==', members))
    const querySnapshot = await getDocs(q)

    let chatId

    // If chat doesn't exist, create new chat document
    if (querySnapshot.empty) {
      const newChatRef = await addDoc(chatsRef, {
        members,
        createdAt: serverTimestamp(),
        lastMessage: messageText,
        lastMessageTime: serverTimestamp()
      })
      chatId = newChatRef.id
    } else {
      // Use existing chat
      chatId = querySnapshot.docs[0].id
    }

    // Add message to messages subcollection
    const messagesRef = collection(db, 'chats', chatId, 'messages')
    await addDoc(messagesRef, {
      senderId: senderID,
      text: messageText,
      timestamp: serverTimestamp()
    })

    // Update chat document with last message
    await setDoc(doc(db, 'chats', chatId), {
      lastMessage: messageText,
      lastMessageTime: serverTimestamp()
    }, { merge: true })

    return chatId

  } catch (error) {
    return { 
      message: 'Failed to send message', 
      status: error.status,
      statusText: error.statusText
     }
  }
}

export function displayMessages(chatId, callback) {
  const messagesRef = collection(db, 'chats', chatId, 'messages')
  const q = query(messagesRef, orderBy('timestamp', 'asc'))
  
  return onSnapshot(q, (querySnapshot) => {
    const messages = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    callback(messages)
  })
}


export async function getChatId(senderId, receiverId) {
  const members = [senderId, receiverId].sort()
  const chatsRef = collection(db, 'chats')
  const q = query(chatsRef, where('members', '==', members))
  const querySnapshot = await getDocs(q)

  if (querySnapshot.empty) {
    // If no chat exists yet, create a new one
    const newChatRef = await addDoc(chatsRef, {
      members,
      createdAt: serverTimestamp()
    })
    return newChatRef.id
  }

  return querySnapshot.docs[0].id
}

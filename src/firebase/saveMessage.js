import { db } from '../config/firebase'
import { collection, addDoc } from 'firebase/firestore'

export async function saveMessage(msg) {
    const messagesRef = collection(db, 'users', msg.senderID, 'messages')
    await addDoc(messagesRef, msg)
    return null
}
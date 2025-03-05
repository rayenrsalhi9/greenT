import { db } from '../config/firebase'
import { doc, collection, query, where, getDocs, getDoc } from 'firebase/firestore'

export async function showContacts(userID) {
    try {
        // Query chats where current user is a member
        const chatsRef = collection(db, 'chats')
        const q = query(chatsRef, where('members', 'array-contains', userID))
        const querySnapshot = await getDocs(q)

        const contacts = []
        
        // For each chat, get the other member's details and last message
        for (const chatDoc of querySnapshot.docs) {
            const chatData = chatDoc.data()
            const members = chatData.members
            const otherUserId = members.find(id => id !== userID)

            const userRef = doc(db, 'users', otherUserId)
            const userSnapshot = await getDoc(userRef)
            
            const userObject = {
                ...userSnapshot.data(),
                id: userSnapshot.id,
                lastMessage: chatData.lastMessage || '',
                lastMessageTime: chatData.lastMessageTime || null
            }
            contacts.push(userObject)
        }

        return contacts.sort((a, b) => b.lastMessageTime - a.lastMessageTime)

    } catch (error) {
        console.error("Error fetching contacts:", error)
        return []
    }
}

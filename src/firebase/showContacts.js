import { db } from '../config/firebase'
import { doc, collection, query, where, getDocs, getDoc } from 'firebase/firestore'

export async function showContacts(userID) {
    try {

        // Query chats where current user is a member
        const chatsRef = collection(db, 'chats')
        const q = query(chatsRef, where('members', 'array-contains', userID))
        const querySnapshot = await getDocs(q)

        const contacts = []
        
        // For each chat, get the other member's details
        for (const chatDoc of querySnapshot.docs) {

            const members = chatDoc.data().members
            const otherUserId = members.find(id => id !== userID)

            const userRef = doc(db, 'users', otherUserId)
            const userSnapshot = await getDoc(userRef)
            const userObject = {...userSnapshot.data(), id: userSnapshot.id}
            contacts.push(userObject)
        }

        return contacts

    } catch (error) {
        console.error("Error fetching contacts:", error)
        return []
    }
}

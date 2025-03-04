import { db } from "../config/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export async function displayMsgs(senderID, destinationID) {

    const usersRef = collection(db, 'users')
    const usersSnapshot = await getDocs(usersRef)

    let msgs = []

    for (const userDoc of usersSnapshot.docs) {
        if (userDoc.id === senderID || userDoc.id === destinationID) {

            const q = query(collection(db, 'users', userDoc.id, 'messages'), orderBy("createdAt", "asc"))
            const msgsSnapshot = await getDocs(q)

            const allMsgs = msgsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))

            msgs = [...msgs, ...allMsgs, ]
        }  
    }   
    return msgs 
}
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function getUser(id) {
    try {
        const userRef = doc(db, 'users', id)
        const userSnapshot = await getDoc(userRef)
        const userObject = {...userSnapshot.data(), id: userSnapshot.id}
        return userObject
    } catch (error) {
        return { 
            message: 'Failed to get user', 
            status: error.status,
            statusText: error.statusText
         }
    }
}
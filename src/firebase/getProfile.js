import { db } from "../config/firebase";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import { objectives } from "../utils/objectives";

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

export async function assignObjectives(userID) {
    try {
        const objectivesRef = collection(db, 'users', userID, 'objectives')

        await Promise.all(objectives.map(objective => addDoc(objectivesRef, objective)));

        return null
    } catch (error) {
        return { 
            message: 'Failed to assign objectives', 
            status: error.status,
            statusText: error.statusText
         }
    }
}

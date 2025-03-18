import { db } from "../config/firebase";
import { doc, getDoc, collection, addDoc, getDocs } from "firebase/firestore";
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
        const userRef = doc(db, 'users', userID)
        const objectivesRef = collection(userRef, 'objectives')

        await Promise.all(objectives.map(el => addDoc(objectivesRef, el)));

        return null
    } catch (error) {
        return { 
            message: 'Failed to assign objectives', 
            status: error.status,
            statusText: error.statusText
         }
    }
}

export async function getUserObjectives(userID) {
    try {
        const userRef = doc(db, 'users', userID)
        const objectivesRef = collection(userRef, 'objectives')
        const objectivesSnapshot = await getDocs(objectivesRef)
        const objectives = objectivesSnapshot.docs.map(doc => (
            {
                id: doc.id,
                ...doc.data()
            }
        ))
        return objectives
    } catch (error) {
        return { 
            message: 'Failed to get user objectives', 
            status: error.status,
            statusText: error.statusText
         }
    }
}
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function getUser(id) {
    const userRef = doc(db, 'users', id)
    const userSnapshot = await getDoc(userRef)
    const userObject = {...userSnapshot.data(), id: userSnapshot.id}
    return userObject
}
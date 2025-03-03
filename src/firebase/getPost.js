import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function getPost(userId, postId) {
    const postRef = doc(db, 'users', userId, 'posts', postId)
    const postSnapshot = await getDoc(postRef)
    const postObject = {...postSnapshot.data(), id: postSnapshot.id}
    return postObject
}
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export async function displayPosts() {
    try {
        const postsRef = collection(db, 'posts')
        const postsSnapshot = await getDocs(postsRef)

        const posts = await Promise.all(postsSnapshot.docs.map(async postDoc => {
            const userRef = collection(db, 'users')
            const userSnapshot = await getDocs(userRef)
            const user = userSnapshot.docs.find(doc => doc.id === postDoc.data().userID)
            const userData = user.data()

            return {
                id: postDoc.id,
                ...postDoc.data(),
                firstName: userData.firstName,
                lastName: userData.lastName
            }
        }))

        return posts.sort((a, b) => b.createdAt - a.createdAt)
    } catch (error) {
        console.error('Error fetching posts:', error)
        return []
    }
}
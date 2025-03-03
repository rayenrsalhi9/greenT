import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export async function displayPosts() {
    const usersRef = collection(db, 'users')
    const usersSnapshot = await getDocs(usersRef)

    let posts = []

    for (const userDoc of usersSnapshot.docs) {
        const userID = userDoc.id
        const { firstName, lastName } = userDoc.data()
        
        const postsRef = collection(db, 'users', userID, 'posts')
        const postsSnapshot = await getDocs(postsRef)

        const allPosts = postsSnapshot.docs.map(postDoc => ({
            id: postDoc.id,
            userID,
            firstName,
            lastName,
            ...postDoc.data()
        }))

        posts = [...posts, ...allPosts]
    }

    return posts
}
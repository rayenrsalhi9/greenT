import { 
    collection, 
    getDocs, 
    getDoc, 
    doc, 
    deleteDoc,
    updateDoc
 } from "firebase/firestore";
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

export async function displayPostsByUser(userID) {
    try {
        const postsRef = collection(db, 'posts')
        const postsSnapshot = await getDocs(postsRef)

        const userPosts = postsSnapshot.docs.filter(doc => doc.data().userID === userID)

        return userPosts.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
    } catch (error) {
        console.error('Error fetching posts by user:', error)
        return []
    }
}

export async function getPostDetails(postId) {
    const postRef = doc(db, 'posts', postId)
    const postSnapshot = await getDoc(postRef)

    const post = {
        id: postSnapshot.id,
        ...postSnapshot.data()
    }
    return post
}

export async function deletePost(postId, navigate) {
    try {
        const postRef = doc(db, 'posts', postId)
        await deleteDoc(postRef)
        navigate('/profile/posts?message=Post deleted successfully')
        return null
    } catch (error) {
        return { error: 'Failed to delete post', code: error.code }
    }
}

export async function updatePost(postId, postData) {
    try {
        const postRef = doc(db, 'posts', postId)
        await updateDoc(postRef, postData)
        return { success: 'Post updated successfully' }
    } catch (error) {
        return { error: 'Failed to update post', code: error.code }
    }
}


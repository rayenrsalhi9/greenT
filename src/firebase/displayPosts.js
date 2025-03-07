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
        return { 
            message: 'Failed to fetch posts', 
            status: error.status,
            statusText: error.statusText
         }
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
        })).sort((a, b) => b.createdAt - a.createdAt)
    } catch (error) {
        return { 
            message: 'Failed to fetch posts by user', 
            status: error.status,
            statusText: error.statusText
         }
    }
}

export async function getPostDetails(postId) {
    try {
        const postRef = doc(db, 'posts', postId)
        const postSnapshot = await getDoc(postRef)

        const post = {
            id: postSnapshot.id,
            ...postSnapshot.data()
        }
        return post
    } catch (error) {
        return { 
            message: 'Failed to get post details', 
            status: error.status,
            statusText: error.statusText
         }
    }
}

export async function deletePost(postId, navigate) {
    try {
        const postRef = doc(db, 'posts', postId)
        await deleteDoc(postRef)
        navigate('/profile/posts?message=Post deleted successfully')
        return null
    } catch (error) {
        return { 
            message: 'Failed to delete post', 
            status: error.status,
            statusText: error.statusText
         }
    }
}

export async function updatePost(postId, postData) {
    try {
        const postRef = doc(db, 'posts', postId)
        await updateDoc(postRef, postData)
        return { success: 'Post updated successfully' }
    } catch (error) {
        return { 
            message: 'Failed to update post', 
            status: error.status,
            statusText: error.statusText
         }
    }
}


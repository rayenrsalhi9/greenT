import { 
    collection, 
    getDocs, 
    getDoc, 
    doc, 
    deleteDoc,
    updateDoc,
    increment
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
        console.error(error)
        return 'Failed to fetch posts'
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
        console.error(error)
        return 'Failed to fetch posts by user'
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
        console.error(error)
        return 'Failed to get post details'
    }
}

export async function deletePost(postId, navigate) {
    try {
        const postRef = doc(db, 'posts', postId)
        const postSnapshot = await getDoc(postRef)
        const postData = postSnapshot.data()

        const statsRef = doc(db, 'stats', 'globalStats')
        
        await updateDoc(statsRef, {
            totalPosts: increment(-1),
            totalBottles: increment(-postData.bottles),
            totalBags: increment(-postData.bags),
            totalMixed: increment(-postData.mixed)
        })

        await deleteDoc(postRef)

        navigate('/profile/posts?message=Post deleted successfully')

        return null
    } catch (error) {
        console.error(error)
        return 'Failed to delete post'
    }
}

export async function updatePost(postId, postData) {
    try {
        const postRef = doc(db, 'posts', postId)
        const statsRef = doc(db, 'stats', 'globalStats')
        const postSnapshot = await getDoc(postRef)
        const postDataBeforeUpdate = postSnapshot.data()
        await updateDoc(statsRef, {
            totalBottles: increment(-postDataBeforeUpdate.bottles),
            totalBags: increment(-postDataBeforeUpdate.bags),
            totalMixed: increment(-postDataBeforeUpdate.mixed)
        })
        await updateDoc(postRef, postData)
        await updateDoc(statsRef, {
            totalBottles: increment(postData.bottles),
            totalBags: increment(postData.bags),
            totalMixed: increment(postData.mixed)
        })
        return { success: 'Post updated successfully' }
    } catch (error) {
        console.error(error)
        return 'Failed to update post'
    }
}

export async function showTotalItemsShared() {
    try {
        const statsRef = doc(db, 'stats', 'globalStats')
        const statsSnapshot = await getDoc(statsRef)

        return {
            id: statsSnapshot.id,
            ...statsSnapshot.data()
        }
    } catch (error) {
        console.error(error)
        return "Failed to get total items shared"
    }
}


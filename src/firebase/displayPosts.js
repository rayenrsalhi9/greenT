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
            const userRef = doc(db, 'users', postDoc.data().userID)
            const userSnapshot = await getDoc(userRef)
            const userData = {...userSnapshot.data(), id: userSnapshot.id}

            return {
                id: postDoc.id,
                ...postDoc.data(),
                user: userData
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

export async function savePostToUser(userID, postID) {
    try {
        const userRef = doc(db, 'users', userID)
        const userSnapshot = await getDoc(userRef)
        let saved = userSnapshot.data().savedPosts || []
        saved = [...saved, postID]
        await updateDoc(userRef, { savedPosts: saved })
    } catch (error) {
        console.error(error)
        return 'Failed to save post to user'
    }
}

export async function removePostFromUser(userID, postID) {
    try {
        const userRef = doc(db, 'users', userID)
        const userSnapshot = await getDoc(userRef)
        let saved = userSnapshot.data().savedPosts || []
        saved = saved.filter(id => id !== postID)
        await updateDoc(userRef, { savedPosts: saved })
    } catch (error) {
        console.error(error)
        return 'Failed to remove post from user'
    }
}

export async function checkPostSaved(userID, postID) {
    try {
        const userRef = doc(db, 'users', userID)
        const userSnapshot = await getDoc(userRef)
        const savedPosts = userSnapshot.data().savedPosts || []
        return savedPosts.includes(postID)
    } catch (error) {
        console.error(error)
        return 'Failed to check if post is saved'
    }
}

export async function getSavedPosts(userID) {
    try {
        const userRef = doc(db, 'users', userID)
        const userSnapshot = await getDoc(userRef)
        const savedPosts = userSnapshot.data().savedPosts || []
        const posts = await Promise.all(savedPosts.map(async (postID) => {
            const postRef = doc(db, 'posts', postID)
            const postSnapshot = await getDoc(postRef)
            const userRef = doc(db, 'users', postSnapshot.data().userID)
            const userSnapshot = await getDoc(userRef)
            const userData = {...userSnapshot.data(), id: userSnapshot.id}
            return {
                id: postSnapshot.id,
                ...postSnapshot.data(),
                user: userData
            }
        }))
        return posts
    } catch (error) {
        console.error(error)
        return 'Failed to get saved posts'
    }
}
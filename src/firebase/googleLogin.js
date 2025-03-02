import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, googleProvider, db } from "../config/firebase";
import { getSignUpErrorMessage } from "./loginErrorMsgs";

export async function googleLogin(navigate) {
    try {
        
        const userData = await signInWithPopup(auth, googleProvider)
        const user = userData.user

        await saveUserToFirebase(user)

        navigate('/profile')
        return null
    } catch(err) {
        return getSignUpErrorMessage(err.code)
    }
}

async function saveUserToFirebase(user) {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        await setDoc(userRef, {
            firstName: user.displayName ? user.displayName.split(' ')[0] : '',
            lastName: user.displayName ? user.displayName.split(' ')[1] : '',
            email: user.email,
            city: '',
            phone: '',
            createdAt: serverTimestamp(),
            points: 0,
            badge: 'Eco Newbie'
        });
}}
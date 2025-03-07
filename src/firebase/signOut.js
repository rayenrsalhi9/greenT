import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

export async function signout(navigate) {
    try {
        await signOut(auth);
        navigate('/login?message=Disconnected successfully.');
        return null
    } catch (error) {
        return { 
            message: 'Failed to sign out', 
            status: error.status,
            statusText: error.statusText
         }
    }
}
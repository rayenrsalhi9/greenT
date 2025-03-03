import { db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { redirect } from "react-router-dom";

export const sharePost = async (userId, postAttributes) => {
    try {
        await addDoc(collection(db, "users", userId, "posts"), postAttributes);
        return redirect('/posts')
    } catch(err) {
        return(err)
    }
};
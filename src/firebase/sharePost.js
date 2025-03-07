import { db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { redirect } from "react-router-dom";

export const sharePost = async (postAttributes) => {
   try {
    await addDoc(collection(db, "posts"), postAttributes);
    return redirect('/posts')
   } catch(err) {
    return { 
      message: 'Failed to share post', 
      status: err.status,
      statusText: err.statusText
     }
   }
};
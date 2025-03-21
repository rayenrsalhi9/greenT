import { db } from "../config/firebase";
import { addDoc, collection, updateDoc, increment, doc } from "firebase/firestore";
import { redirect } from "react-router-dom";

export const sharePost = async (postAttributes) => {
   try {
    await addDoc(collection(db, "posts"), postAttributes);

    try {
      const statsDocRef = doc(db, "stats", "globalStats");
      await updateDoc(statsDocRef, { 
          totalPosts: increment(1),
          totalBottles: increment(postAttributes.bottles),
          totalBags: increment(postAttributes.bags),
          totalMixed: increment(postAttributes.mixed)
      });
    } catch (error) {
      console.error(error)
      return 'Failed to update stats'
    }
     
    return redirect('/posts')
   } catch(err) {
     console.log(err)
     return 'Failed to share post'
   }
};
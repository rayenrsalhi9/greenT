import { db } from "../config/firebase";
import { collection, doc, getDocs, getDoc, updateDoc, query, where } from "firebase/firestore";

export async function markLoginAsDone(userID) {
    try {
        const objectivesRef = collection(db, "users", userID, "objectives");

        const q = query(objectivesRef, where("taskID", "==", "app-login"));
        const snap = await getDocs(q);

        if (!snap.empty) {
            const loginRef = snap.docs[0].ref;
            await updateDoc(loginRef, { done: true });
            await addObjectivePointsToUser(userID, snap.docs[0].id);
        }  

        return null;
    } catch (error) {
        return {
            message: "Failed to mark login as done",
            status: error.status,
            statusText: error.statusText,
        };
    }
}

export async function addObjectivePointsToUser(userID, objectiveID) {
    try {
        const userRef = doc(db, "users", userID);
        const userSnap = await getDoc(userRef);
        const userPoints = userSnap.data().points;

        const objectiveRef = doc(db, "users", userID, "objectives", objectiveID);
        const objectiveSnap = await getDoc(objectiveRef);
        const objectivePoints = objectiveSnap.data().points;

        const newPoints = userPoints + objectivePoints;

        await updateDoc(userRef, { points:  + newPoints });

        return null;
    } catch (error) {
        return {
            message: "Failed to add points to user",
            status: error.status,
            statusText: error.statusText,
        };
    }
}
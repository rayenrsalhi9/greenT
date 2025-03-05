import { db } from "../config/firebase";
import { collection, query, where, onSnapshot, getDocs } from "firebase/firestore";

export function displayMsgs(senderID, destinationID, callback) {
    const usersRef = collection(db, 'users');
    const unsubscribers = [];

    function fetchMessages(userID) {
        const q = query(
            collection(db, 'users', userID, 'messages'),
            where("senderID", "==", senderID),
            where("destinationID", "==", destinationID)
        );
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
            let msgs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            msgs.sort((a, b) => a.createdAt - b.createdAt);
            callback(msgs);
        });
        
        unsubscribers.push(unsubscribe);
    }

    getDocs(usersRef).then(usersSnapshot => {
        usersSnapshot.docs.forEach(userDoc => {
            if (userDoc.id === senderID || userDoc.id === destinationID) {
                fetchMessages(userDoc.id);
            }
        });
    });

    return () => {
        unsubscribers.forEach(unsub => unsub());
    };
}
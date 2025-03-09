import { db } from "$lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function load({ params }) {
    const { userID } = params;
    const userRef = doc(db, "users", userID);
    const userSnapshot = await getDoc(userRef);
    
    if(userSnapshot.exists()) {
        return {
            fullName: userSnapshot.data().fullName,
            phoneNumber: userSnapshot.data().phoneNumber

        };
    }
}
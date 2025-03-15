import { db } from "$lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function load({ params }) {
    const userID = params.user;
    console.log(userID)
    const userRef = doc(db, "users", userID);

    const userSnapshot = await getDoc(userRef);
    if(userSnapshot.exists()) {

        return {
            userID: userSnapshot.id,
            userInfo: userSnapshot.data(),
    
        };    
    }
}
import { db } from "$lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { json } from "@sveltejs/kit";

export async function DELETE({ request }) {
    const userID = await request.json();
    console.log("Received id in the back end:", userID);
    try {

        const docRef = doc(db, "users", userID); 
        
        await deleteDoc(docRef);
        return json({message: "Successfully deleted account"});
    
    } catch (error) {
            console.log("Error deleting user info", error);
            return json({error: "Failed to delete user info"});

        }

}
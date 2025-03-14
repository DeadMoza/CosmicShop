import { db } from "$lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { json } from "@sveltejs/kit";

export async function DELETE({ request }) {
    try {
        const userEmail = await request.json();

        const docRef = doc(db, "users", userEmail);        
            await deleteDoc(docRef);
            console.log("account deleted successfully");
            return json({message: "Successfully deleted account"});

    } catch (error) {
            console.log("Womp Womp", error);
            return json({error: "Failed to delete account"});

        }

}
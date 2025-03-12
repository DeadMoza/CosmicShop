import { db } from "$lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
    try {
        const formData = await request.formData();
        const email = formData.get("email");
        const address = formData.get("address");
        
        const docRef = doc(db, "users", email);
        await updateDoc(docRef, {
            address: address

        });
        return json({message: "Successful address change"});
    } catch (error) {
        console.log("Error from backend request", error);
        return json({message: "Unseccessful address change with error: ", error});

    }
}


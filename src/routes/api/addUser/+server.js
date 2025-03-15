import { db } from "$lib/firebase";
import { doc, setDoc} from "firebase/firestore";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {

    try {
              
        const formData = await request.formData();

        const userID = formData.get("userID");
        const email = formData.get("email");
        const fullName = formData.get("fullName");
        const phoneNumber = formData.get("phoneNumber");
    
        const docRef = doc(db, "users", userID);
        await setDoc(docRef, {
            fullName: fullName,
            email: email,
            phoneNumber: phoneNumber
        
        });
    
        return json({message: "New user created."});

    } catch (error) {
        return json({error: error.message});

    }
}
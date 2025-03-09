import { db } from "$lib/firebase";
import { doc, setDoc} from "firebase/firestore";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {

    try {
              
        const formData = await request.formData();

        const email = formData.get("email");
        const fullName = formData.get("fullName");
        const phoneNumber = formData.get("phoneNumber");
    
        const docRef = doc(db, "users", email);
        await setDoc(docRef, {
            fullName: fullName,
            phoneNumber: phoneNumber
        
        });
    
        return json({message: "New user created."});

    } catch (error) {
        return json({error: error.message});

    }
}
import { db } from "$lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
    try {
        const response = await request.formData();

        const fullName = response.get("fullName");
        const phoneNumber = response.get("phoneNumber");
        const email = response.get("email");
        const address = response.get("address");
        const userID = response.get("userID");

        const products = JSON.parse(response.get("products"));

        const collectionRef = collection(db, "orders");
        await addDoc(collectionRef, {
            fullName: fullName,
            phoneNumber: phoneNumber,
            email: email,
            address: address,
            userID: userID,
            products: products,

        });

        return json({message: "Successfully made a new order."});

    } catch (error) {
        console.log("Dun goofed" , error);
        return json({error: "Failed to make order", error});

    }

    
}

import { db } from "$lib/firebase";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
    try {
        const { userID, productID } = await request.json();

        const docRef = doc(db, "carts", userID);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            await updateDoc(docRef, {
                products: arrayUnion(productID)

            });

        } else {
            await setDoc(docRef, {
                products: [productID]
            });

        }

        return json({message: "Product Added To Cart"});

    } catch (error) {
        console.log("Failed To Add Product To Cart:", error);
        return json({error: error.message});
        
    }
}
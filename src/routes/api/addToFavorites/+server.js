import { db } from "$lib/firebase";
import { getDoc, setDoc, updateDoc, doc, arrayUnion } from "firebase/firestore";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
    try {
        const { userID, productID } = await request.json();

        console.log("The user id is", userID);
        console.log("The product id is", productID);

        const docRef = doc(db, "favorites", userID);
        const docSnapshot = await getDoc(docRef);

        if ((docSnapshot.exists())) {
            await updateDoc(docRef, {
                products: arrayUnion(productID)

            });

        } else {
            await setDoc(docRef, {
            products: [productID]
        });
    }

        return json({message: "Product added to favorites."});

    } catch (error) {
        console.log("An error occured while adding to favorites", error);
        return json({error: "Failed to add product to favorites."});
    }
}
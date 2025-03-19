import { db } from "$lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function load({ params }) {
    try {
        let result = [];

        const userID = params.userID;

        const docRef = doc(db, "favorites", userID);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            const favoriteProducts = docSnapshot.data().products;

            for(let product of favoriteProducts) {
                const docRef = doc(db, "products", product);
                const docSnapshot = await getDoc(docRef);
                const docObject = {
                    id: docSnapshot.id,
                    ...docSnapshot.data()
                };
                
                result.push(docObject);
            }
            return {
                result
            };
        
        } else {
            console.log("No items found in favorites list");
            return;
        }
    } catch (error) {
        console.log("Could not fetch favorite products", error);
    }

    

}
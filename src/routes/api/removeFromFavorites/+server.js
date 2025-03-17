import { db } from "$lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { json } from '@sveltejs/kit';   

export async function DELETE({ request }) {
    try {
        const { userID, productID } = await request.json();
        
        const docRef = doc(db, "favorites", userID);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            let favoritedProducts = docSnapshot.data().products || [];
            favoritedProducts = favoritedProducts.filter(prod => prod != productID);

            await updateDoc(docRef, {
                products: favoritedProducts
            });
            
        }        

        return json({message: "Successful favorite removal"});
        
    } catch (error) {
        console.log("Error removing favorite", error);
    }    
}
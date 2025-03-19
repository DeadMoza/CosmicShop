import { db } from "$lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { json } from '@sveltejs/kit';   

export async function DELETE({ request }) {
    try {
        const { userID, productID } = await request.json();
        
        const docRef = doc(db, "carts", userID);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            let cartProducts = docSnapshot.data().products || [];
            cartProducts = cartProducts.filter(prod => prod != productID);

            await updateDoc(docRef, {
                products: cartProducts
            });
            
        }        

        return json({message: "Successful cart item removal"});
        
    } catch (error) {
        console.log("Error removing from cart", error);
    }    
}
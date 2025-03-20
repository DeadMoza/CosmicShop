import { db } from "$lib/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export async function load({ params }) {
    const userID = params.userID;

    let productsInCart = [];
    let cartTotal = 0;

    const cartRef = doc(db, "carts", userID);
    const cartSnapshot = await getDoc(cartRef);

    if (cartSnapshot.exists()) {
        const cartProducts = cartSnapshot.data().products;

            for(let product of cartProducts) {
                const docRef = doc(db, "products", product);
                const docSnapshot = await getDoc(docRef);
                const docObject = {
                    id: docSnapshot.id,
                    ...docSnapshot.data()
                };
                
                cartTotal += docSnapshot.data().price;
                productsInCart.push(docObject);
            }
    }
    
        return {
            cartProducts: productsInCart,
            cartPrice: cartTotal,
    
        };    
    
}
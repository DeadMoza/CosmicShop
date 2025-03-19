import { db } from "$lib/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export async function load({ params }) {
    const userID = params.userID;

    let products = [];
    let productsInCart = [];
    let cartTotal = 0;

    const userRef = doc(db, "users", userID);
    const productsCollection = collection(db, "products");
    const cartRef = doc(db, "carts", userID);

    const userSnapshot = await getDoc(userRef);
    const productsSnapshot = await getDocs(productsCollection);
    const cartSnapshot = await getDoc(cartRef);

    if (productsSnapshot.empty) {
        console.log("products not found");
        products = [];
    }
    
    await Promise.all(productsSnapshot.docs.map(async (doc) => {
        products.push({id: doc.id, ...doc.data()});

    }));

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
            userID: userSnapshot.id,
            userInfo: userSnapshot.data(),
            products: products,
            cartProducts: productsInCart,
            cartPrice: cartTotal,
    
        };    
    
}
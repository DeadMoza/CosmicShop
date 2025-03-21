import { db } from "$lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function load({ params }) {
    const productID = params.productID;
    let product = {};

    const productRef = doc(db, "products", productID);
    const productSnapshot = await getDoc(productRef);

    if(productSnapshot.exists()) {
        product = productSnapshot.data();
        return {
            productID: productSnapshot.id,
            product 
        }
    } else return {product}
}
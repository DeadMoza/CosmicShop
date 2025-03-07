import { db } from "$lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function load() {
    const snapshot = await getDocs(collection(db, 'products'));

    if (snapshot.empty) {
        return { products: [] };
    }

    // Fetch products and their image URLs
    const products = await Promise.all(
        snapshot.docs.map(async (doc) => {
            const data = doc.data();

            return {
                id: doc.id,
                ...data,
            };
        })
    );
    return { products };
}



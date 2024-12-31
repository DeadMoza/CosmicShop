import { db } from "$lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function load() {
    
    const snapshot = await getDocs(collection(db, 'products'));

    if (snapshot.empty) {
        return { products: [] };
    }

    return {
        products : snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
    
        }))
    };
    
}





    
    
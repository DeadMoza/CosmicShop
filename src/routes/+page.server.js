import { db, storage } from "$lib/firebase";

import { db, storage } from "$lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

export async function load() {
    const snapshot = await getDocs(collection(db, 'products'));

    if (snapshot.empty) {
        return { products: [] };
    }

    // Fetch products and their image URLs
    const products = await Promise.all(
        snapshot.docs.map(async (doc) => {
            const data = doc.data();

            // Fetch URLs for all images in the `imageName` array
            const imageUrls = await Promise.all(
                (data.images || []).map(async (images) => {
                    const imagePath = `products/${data.name}/${images}`;
                    
                    return await getDownloadURL(ref(storage, imagePath)); // Handle missing images
                })
            );

            return {
                id: doc.id,
                ...data,
                imageUrls: imageUrls.filter(url => url !== null), // Filter out failed URLs
            };
        })
    );

    return { products };
}



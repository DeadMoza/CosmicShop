<script>
    export let data;
    let favorites = data.result;
    const userID = data.userID;

    async function removeFromFavorites(productID, index) {
        try {
            console.log(productID, index)
            console.log(data.userID)
            const response = await fetch("/api/removeFromFavorites", {
                method: "DELETE",
                body: JSON.stringify({ userID, productID })

            });

            if (response.ok) {
                console.log("Removed from favorites");

                favorites.splice(index, 1);
                favorites = [...favorites];
                
            }
        } catch (error) {
            console.log("Error removing from favorites", error);
    }
    }

    async function addToCart(productID) {
        const response = await fetch("/api/addToCart", {
                method: "POST",
                body: JSON.stringify({ userID, productID })

            });

            if(response.ok) alertMessage = "Added to cart!";
    }
</script>

<main>
<body>
    <h2 style="text-align: center; margin-top: 0.5em;">Favorite Items</h2>
    {#if favorites.length != 0}
        {#each favorites as product, index}
        <div class="container">
                <div class="imageAndInfo">    
                    <div class="productImage">
                        <img src={product.images[0]} alt="Loading...">
                    </div>
                    <div class="info">
                        <h3>{product.name}</h3>
                        <div>
                            <p>{product.price} LYD</p>
                            <p>{product.color}</p>
                            
                            <button on:click={() => {addToCart(product.id)}} id="addToCartButton" style="margin-top: 0.5em;">Add to cart</button>
                        </div>
                    </div>
                    
                </div>
                
                <button id="removeFromFavoritesButton" on:click|preventDefault={() => {removeFromFavorites(product.id, index)}}>X</button>
                
            </div>
            {/each}

            {:else} <p style="padding-top: 1em; text-align:center;">No favorite items.</p>
        {/if}
            


</body>
</main>

<style>

    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: Arial, Helvetica, sans-serif;

    }

    .container {
        margin: 1em;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        position: relative;

    }

    .imageAndInfo {
        display: flex;
        flex-direction: row;
    }

    .productImage {
        background-color: #e1e1e1;
        border-radius: 5px;

        min-height: 10em;
        min-width: 10em;

        height: 10em;
        width: 10em;

        cursor: pointer;


    }

    .productImage > img {
        height: 100%;
        width: 100%;

        object-fit: contain;
    }

    .info {
        margin: 0.7em;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    #addToCartButton {
        padding: 0.3em;
        cursor: pointer;

        border: none;
        border-radius: 2px;
    }

    #addToCartButton:hover {
        background-color: white;
    }

    #removeFromFavoritesButton {
        position: absolute;

        right: 1em;
        top: 1em;

        border-radius: 20px;
        background-color: #e1e1e1;
        border: none;

        width: 1.5em;
        height: 1.5em;

        color: black;

        cursor: pointer;
    }

    #removeFromFavoritesButton:hover {
        background-color: white;
    }


</style>
<script>
    import Icon from "@iconify/svelte";
    export let data;
    const product = data.product;
    const productID = data.productID;

</script>

<main>
<body>
    <div class="container">
        <div class="productImage">
            <img src="{product.images[0]}" alt="{product.name}">

        </div>
        <div class="productInfo">
            <h1>{product.name}</h1>
            <p style="min-height: 15em; max-height: 25em; height: 100%;">{product.description}</p>
            <h3>Color: {product.color}</h3>
            <h2>{product.price} LYD</h2>

            <div class="buttons">
                <button class="addToCartButton" on:click={addToCart}>Add to cart</button>
                <div>
                    <button class="extraButton" on:click={addToFavorites}><Icon icon="fa6-regular:heart" /></button>
                    <button class="extraButton" on:click={shareProduct}><Icon icon="fa6-solid:share-from-square"/></button>
                
                </div>
            </div>

        </div>
    </div>


</body>
</main>

<style>
    * {
        padding: 0;
        margin: 0;
        font-family: Arial, Helvetica, sans-serif;
        box-sizing: border-box;

    }

    .container {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;

        margin: 1em;

    }

    .productImage {
        min-height: 20em;
        min-width: 20em;

        max-height: 35em;
        max-width: 35em;

        height: 100%;
        width: 100%;

    }

    img {
        height: 100%;
        width: 100%;
        object-fit: contain;

    }

    .productInfo {
        min-height: 20em;
        min-width: 20em;

        max-height: 45em;
        max-width: 35em;

        height: 100%;
        width: 100%;

        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        row-gap: 0.5em;
    }

    .buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .addToCartButton {
        cursor: pointer;
        border-radius: 3px;
        border: 2px solid black;
        background-color: white;
        color: black;
        padding: 5px 15px;
        font-size: 1.2em;

        margin-bottom: 0.5em;
    }

    .extraButton {
        border: none;
        background: none;
        font-size: 1.5em;
    }

    button:hover {
        cursor: pointer;
    }

    

</style>
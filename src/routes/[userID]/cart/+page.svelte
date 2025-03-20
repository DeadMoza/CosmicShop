<script>
    import Icon from "@iconify/svelte";

    export let data;

    let cartProducts = data.cartProducts;
    let cartPrice = data.cartPrice;

    let productQuantity = 1;


</script>

<main>
<body>
    <div class="cartContainer">
        <h1 style="display: flex; align-items: baseline; column-gap: 0.3em;"><a href="/{data.userID}" style="color: #6e6e6e; font-size: 0.8em;"><Icon icon="fa6-solid:arrow-left"/></a>Your Cart</h1>

        <div class="cartTable">

            <h3>Product</h3>
            <h3 style="margin-left: 1em">Quantity</h3>
            <h3>Price</h3>
        </div>
        <div class="productsContainer">
            {#each cartProducts as product}
            <div class="productContainer">
                <hr>
                <div class="productCard">
                    <div class="product">
                        <div class="productImage">
                            <img src="{product.images[0]}" alt="eh">

                        </div>
                        <h3>{product.name}</h3>
    
                    </div>
                    <div class="quantity">
                        <button class="functionButton" id='decrement'><Icon icon="fa6-solid:minus"/></button>
    
                        <h3>{productQuantity}</h3>
    
                        <button class="functionButton" id="increment"><Icon icon="fa6-solid:plus"/></button>
    
                    </div>
                    
                    <h3 style="min-width: 3em; max-width: 5em; width: 100%;">{product.price} LYD</h3>
    
                </div>
    
            </div>
            {/each}

        </div>
        
        <div class="total">
            <h2>Total: {cartPrice} LYD</h2>
        </div>

    </div>

    <div class="addressContainer">

    </div>

</body>
</main>


<style>
    * {
        font-family: Arial;
        padding: 0;
        margin: 0;
        box-sizing: border-box;

    }

    body {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        color: #6e6e6e;
        padding: 1em 18em;
    }

    .cartContainer {
        flex: 60%;
        max-width: 33em;

        min-height: 28em;
        height: 100%;
        max-height: fit-content;

        background-color: #202020;
        border-radius: 5px;

        padding-top: 1em;
        padding-left: 1em;
    }

    .addressContainer {
        flex: 40%;

        min-height: 20em;

        max-width: 25em;
        max-height: 28em;

        background-color: #202020;
        border-radius: 5px;

        padding: 1em;

    }

    .cartContainer .cartTable {
        margin-top: 1em;
        margin-bottom: 0.5em;
        margin-right: 1em;

        display: flex;
        flex-direction: row;
        justify-content: space-between;


    }

    .productsContainer {
        padding-right: 1em;

        min-height: 20em;
        max-height: 36em;
        height: 100%;
        overflow: auto;

    }

    .cartContainer .productContainer .productCard {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        min-height: fit-content;

        padding: 1em 0;

    }

    .cartContainer .productContainer .productCard .product {
        min-width: 10em;

        max-width: 10em;
        max-height: 15em;

        overflow: hidden;
        white-space: nowrap;
        
    }

    .cartContainer .productContainer .productCard .quantity {
        max-height: 3em;
        min-width: 10em;

        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }

    .functionButton {
        min-width: 3em;
        min-height: 2em;

        cursor: pointer;

        border-radius: 5px;
        background-color: #6e6e6e;
        border: none;
    }

    .functionButton:hover {
        background-color: #e6e6e6;
    }


    .productImage {
        height: 9em;
        width: 9em;
        background-color: #e6e6e6;
        border-radius: 5px;

        margin-bottom: 0.5em;
    }

    img {
        height: 100%;
        width: 100%;

        object-fit: contain;

    }

    .total {
        text-align: end;
        padding: 1em;
    }

</style>
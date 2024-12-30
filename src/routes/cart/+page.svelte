<script>

    let productQuantity = 1;

    function increment() {
        productQuantity++;

    }

    function decrement() {
        if(productQuantity > 1) {
            productQuantity--;

        }
    }


</script>

<main>
<body>
    <div class="cartContainer">
        <h1>Cart</h1>

        <div class="cartTable">

            <h3>Product</h3>
            <h3 style="margin-left: 1em">Quantity</h3>
            <h3>Price</h3>
        </div>

        <div class="productContainer">
            <hr>
            <div class="productCard">
                <div class="product">
                    <img src="/laptop.png" alt="eh">
                    <h3>Product Name</h3>

                </div>
                <div class="quantity">
                    <button class="functionButton" id='decrement' on:click={decrement}>-</button>

                    <h3>{productQuantity}</h3>

                    <button class="functionButton" id="increment" on:click={increment}>+</button>

                </div>
                
                <h3>250 LYD</h3>

            </div>

        </div>

        <div class="productContainer">
            <hr>
            <div class="productCard">
                <div class="product">
                    <img src="/laptop.png" alt="eh">
                    <h3>Product Name</h3>

                </div>
                <div class="quantity">
                    <button class="functionButton" id='decrement' on:click={decrement}>-</button>

                    <h3>{productQuantity}</h3>

                    <button class="functionButton" id="increment" on:click={increment}>+</button>

                </div>
                
                <h3>250 LYD</h3>

            </div>

        </div>

        <div class="productContainer">
            <hr>
            <div class="productCard">
                <div class="product">
                    <img src="/laptop.png" alt="eh">
                    <h3>Product Name</h3>

                </div>
                <div class="quantity">
                    <button class="functionButton" id='decrement' on:click={decrement}>-</button>

                    <h3>{productQuantity}</h3>

                    <button class="functionButton" id="increment" on:click={increment}>+</button>

                </div>
                
                <h3>250 LYD</h3>

            </div>

        </div>

        <div class="productContainer">
            <hr>
            <div class="productCard">
                <div class="product">
                    <img src="/laptop.png" alt="eh">
                    <h3>Product Name</h3>

                </div>
                <div class="quantity">
                    <button class="functionButton" id='decrement' on:click={decrement}>-</button>

                    <h3>{productQuantity}</h3>

                    <button class="functionButton" id="increment" on:click={increment}>+</button>

                </div>
                
                <h3>250 LYD</h3>

            </div>

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

        padding: 1em 18em;
    }

    .cartContainer {
        flex: 60%;


        max-width: 33em;
        max-height: 40em;

        background-color: #e6e6e6;
        border-radius: 5px;

        padding: 2em 1.5em;

        overflow: auto;
        
    }

    .addressContainer {
        flex: 40%;

        min-height: 20em;

        max-width: 25em;
        max-height: 28em;

        background-color: #e6e6e6;
        border-radius: 5px;

        padding: 1em;

    }

    .cartContainer .cartTable {
        margin-top: 1em;
        margin-bottom: 0.5em;

        display: flex;
        flex-direction: row;
        justify-content: space-between;


    }

    .cartContainer .productContainer .productCard {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        min-height: fit-content;

        margin: 1em 0;

    }

    .cartContainer .productContainer .productCard .product {
        min-width: 10em;

        max-width: 10em;
        max-height: 10em;

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
        background-color: white;
        border: none;
    }

    .functionButton:hover {
        background-color: #d6d6d6;
    }

    img {
        height: 100%;
        width: 100%;

        object-fit: contain;
        background-color: white;
        border-radius: 5px;

        margin-bottom: 0.5em;
    }

</style>
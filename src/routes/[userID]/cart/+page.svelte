<script>
    import Icon from "@iconify/svelte";
    import { goto } from "$app/navigation";

    export let data;

    const userID = data.userID;
    const userInfo = data.userInfo;
    let cartProducts = data.cartProducts;
    let cartPrice = data.cartPrice;
    
    let fullName = userInfo.fullName;
    let phoneNumber = userInfo.phoneNumber;
    let email = userInfo.email;
    let address = userInfo.address;

    let alertMessage = "";

    let cartProductsArray = [];
    for (let cartProduct of cartProducts) {
        const productObject = {
            purchaseQuantity: 1,
            cartPrice: cartProduct.price,
            ...cartProduct

        };

        cartProductsArray.push(productObject);
    }

    async function confirmOrder() {

            let products = [];
            for(let product of cartProductsArray) {
                const productObject = {
                    id: product.id,
                    price: product.price,
                    purchaseQuantity: product.purchaseQuantity,
                    totalPrice: product.cartPrice,

                }

                products.push(productObject);
            }

            const formData = new FormData();
            formData.append("fullName", fullName);
            formData.append("phoneNumber", phoneNumber);
            formData.append("email", email);
            formData.append("address", address);
            formData.append("userID", userID);

            formData.append("products", JSON.stringify(products));

            try {
                const response = await fetch("/api/confirmOrder", {
                    method: "POST",
                    body: formData,

                });

                if(response.ok) {
                    alertMessage = "Order placed, You will receive an email shortly.";
                    goto("/");
                    
                }
            } catch (error) {
                alertMessage = "An error occured, please try again later.", error;
            }

        
    }

    function increment(index, productPrice) {
        if(cartProductsArray[index].purchaseQuantity <= 5) {
            cartProductsArray[index].purchaseQuantity++;
            cartProductsArray[index].cartPrice += productPrice;
            cartPrice += productPrice;
            
        } else alertMessage = "Sorry, You can only order a maximum of 5 of each product.";
    }

    async function decrement(index, productPrice, productID) {
        cartProductsArray[index].purchaseQuantity--;
        cartProductsArray[index].cartPrice -= productPrice;
        cartPrice -= productPrice;

        if(cartProductsArray[index].purchaseQuantity <= 0) {
            const userID = data.userID;
            const response = await fetch("/api/removeFromCart", {
               method: "DELETE",
               body: JSON.stringify({ userID, productID })

            });

            if(response.ok) {
                cartProductsArray.splice(index, 1);
                cartProductsArray = [...cartProductsArray];
            }
        }
    }

</script>

<main>
<body>
    <div class="cartContainer">
        <h1 style="display: flex; align-items: baseline; column-gap: 0.3em;"><a href="/{data.userID}" style="color: #6e6e6e; font-size: 0.8em;"><Icon icon="fa6-solid:arrow-left"/></a>Your Cart</h1>
        {#if cartProductsArray.length != 0}
             <div class="cartTable">
     
                 <h3>Product</h3>
                 <h3 style="margin-left: 1em">Quantity</h3>
                 <h3>Price</h3>
             </div>
             
        {/if}
        <div class="productsContainer">
            {#if cartProductsArray.length != 0}
                {#each cartProductsArray as product, index}
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
                            <button class="functionButton" on:click={() => {decrement(index, product.price, product.id)}} id='decrement'><Icon icon="fa6-solid:minus"/></button>
        
                            <h3>{product.purchaseQuantity}</h3>
        
                            <button class="functionButton" on:click={() => {increment(index, product.price)}} id="increment"><Icon icon="fa6-solid:plus"/></button>
        
                        </div>
                        
                        <h3 style="min-width: 3em; max-width: 5em; width: 100%;">{product.cartPrice} LYD</h3>
        
                    </div>
        
                </div>
                {/each}
            {:else}
                <p style="padding-top: 1em; text-align: center;">The cart is empty</p>
            {/if}

        </div>
        
        <div class="total">
            <h2>Total: {cartPrice} LYD</h2>
        </div>

    </div>

    <div class="addressContainer">
        <h1 style="text-align: center; padding-bottom: 0.5em;">Confirm Order</h1>

        <form class= "orderForm">
            <div style="display: flex; justify-content: space-between">
                <input type="text" placeholder="Full Name" style="width: 45%; padding: 0.3em;" bind:value={fullName} required>
                <input type="tel" placeholder="Phone Number" style="width: 45%; padding: 0.3em;" bind:value={phoneNumber} required>
            </div>
            <input type="email" placeholder="Email Address" bind:value={email} required>
            <textarea name="address" id="address" rows="5" placeholder="Full Address" bind:value={address} required></textarea>
            <div class="orderButton">
                <h2>{cartPrice} LYD</h2>
                <button on:click={confirmOrder}>Confirm</button>

            </div>

        </form>

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
        position: relative;

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

    .orderForm {
        display: flex;
        flex-direction: column;
        row-gap: 1em;

    }

    .orderForm > input {
        padding: 0.3em;
    }

    #address {
        resize: none;
        padding: 0.3em;
    }

    .orderButton {
        position: absolute;
        bottom: 20px;
        right: 20px;

    }

    .orderButton > button {
        margin-top: 0.5em;
        width: 9em;
        height: 2em;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

</style>
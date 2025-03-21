<script>
    import { auth } from "$lib/firebase";
    import { onAuthStateChanged } from "firebase/auth";
    import Icon from '@iconify/svelte';
    import { goto } from "$app/navigation";
    export let data;

    let userID = "";
    let userName = "";
    let userEmail = "";

    let alertMessage = "";

    let cartOpen = false;
    let cartTotal = data.cartPrice;

    const allProducts = data.products;
    let cartProducts = data.cartProducts;

    
    onAuthStateChanged(auth, (user) => {
        if(user) {
            userID = user.uid; 
            userName = user.displayName;
            userEmail = user.email;
        }
    });


    async function addToCart(productID, productName, productPrice, productImage) {
        try {
            const response = await fetch("/api/addToCart", {
                method: "POST",
                body: JSON.stringify({ userID, productID })

            });

            if(response.ok) {
                alertMessage = "Product added to cart";
                const image = [productImage];
                const newCartProduct = {
                    name: productName,
                    price: productPrice,
                    images: image

                }

                const productCheck = cartProducts.some(product => product.name == productName);

                if(!productCheck) {
                    cartProducts = [...cartProducts, newCartProduct];
                }
                cartTotal += parseInt(productPrice);
                cartOpen = true;
                console.log("Products in cart:",cartProducts);

            }
        } catch (error) {
            alertMessage = "Error occured while adding to cart", error;
            console.log(alertMessage);
        }
    }

    async function removeFromCart(productID, index, productPrice) {
        try {
            const response = await fetch("/api/removeFromCart", {
                method: "DELETE",
                body: JSON.stringify({userID, productID})

            });
            
            if (response.ok) {
                console.log("Removed from cart");

                cartProducts.splice(index, 1);
                cartProducts = [...cartProducts];

                cartTotal -= productPrice;
            }

        } catch (error) {
            alertMessage = "An error occured while trying to remove a cart item", error;
        }
    }

    async function addToFavorites(productID) {
        try {
            const response = await fetch("/api/addToFavorites", {
                method: "POST",
                body: JSON.stringify({ userID, productID })

            });

            if(response.ok) {
                alertMessage = "Product added to favorites";

            }
        } catch (error) {
            alertMessage = "Error occured while adding to favorites", error;
            console.log(alertMessage);
        }
    }

</script>

<main>
<body>
    <div class="header">
        <a href="/"> <img src="../CosmicLogo.png" alt="cosmic logo" style="height: 8em; width: auto;"></a>

        <div class="searchBarContainer">
            <label for="searchBar" id="searchIcon"> <Icon icon="material-symbols:search-rounded" width="24" height="24" /></label>
            <input type="search" name="searchBar" id="searchBar">
            <button class ="searchButton"><Icon icon="material-symbols:subdirectory-arrow-right-rounded" width="24" height="24" padding= "0"/></button>

        </div>

        <div class="navButtonsContainer">
            <button on:click={goto(`/${userID}/profile`)} style="margin-left: 0.5em"> <Icon icon="mdi:account-circle"/></button>
            <button on:click|preventDefault={() => cartOpen = !cartOpen} style="margin-right: 0.5em" ><Icon icon="mdi:cart"/></button>
            
            <div class="access">
                <p style="color:#e1e1e1">Welcome<br> <b>{userName}</b></p>
                
                
            </div>

        </div>
       {#if cartOpen}
        <div class="temporaryCart">
            <div class="tempCartTitle">
                <h3>Your Cart</h3>
                <button on:click|preventDefault={() => cartOpen = false}><Icon icon="fa6-solid:xmark"/></button>

            </div>
            <div class="tempCartProducts">
                {#if !cartProducts.length == 0}
                    {#each cartProducts as product, index}
                    <div class="tempCartProduct">
                            <div style="display: flex; flex-direction: row; coum">

                                <div class="tempCartProductImage">
                                    <img src="{product.images[0]}" alt="Loading...">
                                    
                                </div>
                                
                                <div class="tempCartProductInfo">
                                    <h4>{product.name}</h4>
                                    <p>{product.price} LYD</p>
                                    
                                </div>
                                
                            </div>
                        
                        <button on:click|preventDefault={() => {removeFromCart(product.id, index, product.price)}} id="removeFromTempCartButton" style="color: red; font-size: 1.1em;"><Icon icon="fa6-solid:trash-can"/></button>
                        
                    </div>
                    
                    {/each}
                {:else}
                    <p style="text-align: center;">No items in cart</p>
                {/if}

            </div>
            <div class="tempCartTotal">
                {#if cartTotal}
                    <p>Total: <b>{cartTotal} LYD</b></p>
                    <button on:click={goto(`/${userID}/cart`)}>Checkout<Icon icon="fa6-solid:arrow-right"/></button>
                {/if}
            </div>
        </div>
        {/if}
    </div>

    <div class="topPanel">
        <div class="topProductDescribtion">
            <h1 style="padding-bottom: 1em; color: white">Macbook Pro M3 Chipset</h1>
            <p style="font-size: large; color: white">Lorem ipsum odor amet, consectetuer adipiscing elit. Risus ullamcorper non tincidunt ipsum dui. 
                Faucibus mattis sodales lobortis ante donec vivamus. Pulvinar per fusce feugiat praesent cursus.
                Elementum morbi class ridiculus mauris laoreet tempor. Vehicula quam nibh ac feugiat, facilisis eget.
                Arcu imperdiet id est a sem fringilla neque. Lorem et per purus consectetur augue sit ut potenti inceptos.
                Lacus nec elementum risus, magna velit lectus porta iaculis ldafk.{alertMessage}</p>


        </div>

        <div class="topProductImage">
            <img src="../laptop.png" alt="laptop">

        </div>


    </div>
    
    <div class="mainContent">
        {#each allProducts as product}

        <div class="productContainer">
            <div class="addToFavoritesButton">
                <button on:click|preventDefault={() => {addToFavorites(product.id)}}><Icon icon="fa6-regular:heart"/></button>
            </div>
            <a href="/products/{product.id}">
                <div class="productImage">
                    <img src={product.images[0]} alt="Loading...">
                </div>
            </a>
            <h2 class="product_name">{product.name}</h2>
            <span class="priceAndCart">
                <h3>{product.price} LYD</h3>
                <button on:click|preventDefault={() => {addToCart(product.id, product.name, product.price, product.images[0])}}>Add To Cart</button>
            </span>
        </div>
        {/each}

        
        

    </div>
    
</body>
</main>


<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Arial;

    }

    body {
        display: flex;
        flex-direction: column;

        background-color: #e1e1e1;

    }

    button {
        cursor: pointer;
    }

    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        line-height: 17px;

        padding: 0 15em;

        background-color: #202020;

    }

    .header .searchBarContainer {
        background-color: rgb(225, 225, 225);
        min-height: fit-content;
        max-width: 70%;

        height: 3.5em;
        width: 70%;

        border-radius: 10px;
        border: solid black;

        display: flex;
        flex-direction: row;
        align-items: center;


    }


    .header .searchBarContainer #searchIcon {
        padding: 0 0.5em 0 1em;
    }

    .header .searchBarContainer #searchBar {
        border: none;
        background-color: rgb(225, 225, 225);

        width: 80%;
        height: 90%;

    }

    .header .searchBarContainer #searchBar:focus {
        outline: none;
    }

    .header .searchBarContainer .searchButton {
       
        cursor: pointer;
        border-radius: 5px;
        border: 2px solid black;
        color: black;
        background-color:rgb(225, 225, 225);
        width: 10%;
        padding: 2px;
        margin-left: 5px;
        box-shadow: 0 4px 0 black, 2px 12px 10px transparent;
		transform: translate(0, -4px);
		transition: all 0.02s;

    }

    .header .searchBarContainer .searchButton:hover {
        background-color: rgb(225, 225, 225);
    }

    .header .searchBarContainer .searchButton:active {
		transform: translate(0, -1px);
		box-shadow: 0 1px 0 black, 2px 6px 10px transparent;
	}

    .navButtonsContainer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

    }

    .navButtonsContainer > button {
        margin-right: 1em;
        border: none;
        background: none;

        color: #e1e1e1;
        font-size: 2em;

        margin: 0;
    }

    .temporaryCart {
        position: absolute;
        right: 10em;
        top: 6em;

        min-width: 20em;
        max-width: 24em;
        width: 100%;

        min-height: 10em;
        max-height: 20em;

        background-color: #e1e1e1;
        border-radius: 5px;

        padding: 0.5em;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        row-gap: 0.5em;

    }

    .tempCartTitle {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

    }

    .tempCartTitle > button {
        cursor: pointer;

        border: none;
        background: none;
        border-radius: 20px;

        height: fit-content;
        width: 20px;

    }

    .tempCartTitle > button:hover {
        color: red;

    }

    .tempCartProducts {
        overflow: auto;
        background-color: white;
        padding: 0.5em;
        border-radius: 5px;
        

    }

    .tempCartProduct {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 0.5em;
        padding-left: 0.5em;
        padding-right: 1em;

        border-radius: 5px;
        background-color: #e1e1e1;


    }

    .tempCartProductInfo {
        display: flex;
        flex-direction: column;
        justify-content: center;

        margin-left: 0.4em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        min-width: 6em;
        width: 9em;

    }

    .tempCartProductImage {
        border-radius: 5px;

        width: 4em;
        height: 4em;

    }

    .tempCartProduct > button {
        background: none;
        border: none;
        
    }

    .tempCartTotal {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: baseline;

    }

    .tempCartTotal > button {
        background-color: #202020;  
        color: #e1e1e1;
        border: none;
        border-radius: 5px;
        padding: 0.5em;

        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 0.5em;        
    }

    .tempCartTotal > button:hover {
        background-color: #82d900;
        color: black;
    } 

    .access {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

    }

    .topPanel {
        padding: 0 15em;
        min-height: 25em;
        max-height: 40em;

        display: flex;
        flex-direction: row;

        background-color: #202020;

        border-bottom-right-radius: 15px;
        border-bottom-left-radius: 15px;

    }

    .topPanel .topProductDescribtion {
        
        flex: 45%;

        padding: 0 1em;

        display: flex;
        flex-direction: column;
        justify-content: center;

    }

    .topPanel .topProductImage {
        
        flex: 55%;

        padding: 0 1em;

        display: flex;
        flex-direction: column;
        justify-content: center;

    }

    .mainContent {
        background-color: #e1e1e1;
        min-height: 100vh;
        height: 100%;

        padding: 3em 6em;

        display: grid;
        grid-template-columns: auto auto auto auto;
        row-gap: 3em;
        column-gap: 0.1em;

    }

    .mainContent .productContainer {
        min-height: 18em;
        min-width: 15em;

        max-width: 18em;

        width: fit-content;
        position: relative;
        

    }

    .mainContent .productContainer .addToFavoritesButton {
        position: absolute;

        top: 10px;
        right: 10px;
    }

    .mainContent .productContainer .addToFavoritesButton > button {
        background: none;
        border: none;
        cursor: pointer;

        font-size: 1.5em;
        color: #ff8c9f;
    }


    .mainContent .productContainer .productImage {
        background-color: white;
        margin-bottom: 0.5em;

        min-width: 15em;
        min-height: 15em;   

        width: 18em;
        height: 18em;

        border-radius: 10px;

    }

    .mainContent .productContainer .priceAndCart {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

    }

    .mainContent .productContainer .product_name {
        overflow: hidden;
        text-overflow: ellipsis;

    }

    .mainContent .productContainer .priceAndCart > button {
        cursor: pointer;
        border-radius: 3px;
        border: 2px solid black;
        background-color: white;
        color: black;
        padding: 5px 15px;

        margin-bottom: 0.5em;
    }
    
    .mainContent .productContainer .priceAndCart > button:hover {
        background-color: rgb(225, 225, 225);
    }
    
    img {
        height: 100%;
        width: 100%;

        object-fit: contain
    }


</style>
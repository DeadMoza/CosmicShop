<script>
    import Icon from "@iconify/svelte";
    import { auth } from "$lib/firebase";
    import { onAuthStateChanged } from "firebase/auth";
    import { goto } from "$app/navigation";
    
    export let data;

    const product = data.product;
    const productID = data.productID;

    let alertMessage = "";
    let userSignedIn = false;
    let userID = "";
    let userName = "";
    

    onAuthStateChanged(auth, (user) => {
        if(user) {
            userSignedIn = true;

            userID = user.uid;
            userName = user.displayName;
        }
    });

    async function addToCart() {
        if(userSignedIn) {
            try {
            const response = await fetch("/api/addToCart", {
                method: "POST",
                body: JSON.stringify({ userID, productID })

            });

            if(response.ok) {
                alertMessage = "Added to cart!";
                console.log(alertMessage);
            }
        } catch (error) {
            alertMessage = "An error occured while adding to cart,", error;
            console.log(alertMessage);

        }

        } else goto("/login");
    }

    async function addToFavorites() {
        if(userSignedIn) {
            try {
                const response = await fetch("/api/addToFavorites", {
                    method: "POST",
                    body: JSON.stringify({ userID, productID }),

                });
                
                if(response.ok) {
                    alertMessage = "Added to favorites";
                    console.log(alertMessage);
                }

            } catch (error) {
                alertMessage = "An error occured while adding to favorites,", error;
                console.log(alertMessage)
            }
        } else goto("/login");
    }

    async function shareProduct() {
        alertMessage = "Link copied to clipboard";
        
    }


</script>

<main>
<body>

    <div class="page">

        {#if userSignedIn}
        <div class="header">
            <a href="/"> <img src="../CosmicLogo.png" alt="cosmic logo" style="height: 8em; width: auto;"></a>

            <div class="searchBarContainer">
                <label for="searchBar" id="searchIcon"> <Icon icon="material-symbols:search-rounded" width="24" height="24" /></label>
                <input type="search" name="searchBar" id="searchBar">
                <button class ="searchButton"><Icon icon="material-symbols:subdirectory-arrow-right-rounded" width="24" height="24" padding= "0"/></button>
                
            </div>
            
            <div class="navButtonsContainer">
                <button on:click={goto(`/${userID}/profile`)} style="margin-left: 0.5em"> <Icon icon="mdi:account-circle"/></button>
                <button on:click={goto(`/${userID}/cart`)} style="margin-right: 0.5em" ><Icon icon="mdi:cart"/></button>
                
                <div class="access">
                    <p style="color:#e1e1e1">Welcome<br> <b>{userName}</b></p>
                    
                </div>

            </div>
        </div>
            
            {:else}
            
            <div class="header">
                <a href="/"> <img src="../CosmicLogo.png" alt="cosmic logo" style="height: 8em; width: auto;"></a>
                
                <div class="searchBarContainer">
                    <label for="searchBar" id="searchIcon"> <Icon icon="material-symbols:search-rounded" width="24" height="24" /></label>
                    <input type="search" name="searchBar" id="searchBar">
                    <button class ="searchButton"><Icon icon="material-symbols:subdirectory-arrow-right-rounded" width="24" height="24" padding= "0"/></button>
                    
                </div>
                
                
                <div class="accessButtons">      
                    <a href="/login" style="color: #202020; padding-top: 2px;" id="login">Log in</a>
                    <a href="/signup" style="background-color: #202020; border-radius: 3px; padding: 0.2em;" id="signup">Sign up</a>
                    
                </div>
                
            </div>
            
            {/if}
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
    
</div>
    <footer>

        <a href=" ">Help</a>
        <a href=" ">Terms of service</a>
        <p> &copy; Cosmic Store</p>
    
    </footer>
    


</body>
</main>

<style>
    * {
        padding: 0;
        margin: 0;
        font-family: Arial, Helvetica, sans-serif;
        box-sizing: border-box;

    }

    .page {        
        min-height: 100vh;
        background-color: #e1e1e1;

    }

    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        line-height: 17px;

        padding: 0 15em;

        background-color: #202020;
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;


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

    .accessButtons {
        background-color: #e1e1e1;
        border-radius: 5px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        row-gap: 0.4em;
    }

    a {
        text-decoration: none;
        color: #e1e1e1;
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

    .access {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

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

        height: 30em;
        width: 30em;


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


    footer {
        display: flex;
        justify-content: space-evenly;

        background-color: #202020;
        color: #e1e1e1;

        width: 100%;
        bottom: 0;

        padding: 1rem;
        

    }
    

</style>
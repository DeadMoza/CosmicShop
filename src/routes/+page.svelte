<script>
    export let data; 
    function shlal(){
        console.log(data.products);

    }
</script>

<main>
<body>
    <div class="topPanel">
        <div class="topProductDescribtion">
            <h1 style="padding-bottom: 1em; color: white">Macbook Pro M3 Chipset</h1>
            <p style="font-size: large; color: white">Lorem ipsum odor amet, consectetuer adipiscing elit. Risus ullamcorper non tincidunt ipsum dui. 
                Faucibus mattis sodales lobortis ante donec vivamus. Pulvinar per fusce feugiat praesent cursus.
                Elementum morbi class ridiculus mauris laoreet tempor. Vehicula quam nibh ac feugiat, facilisis eget.
                Arcu imperdiet id est a sem fringilla neque. Lorem et per purus consectetur augue sit ut potenti inceptos.
                Lacus nec elementum risus, magna velit lectus porta iaculis.</p>


        </div>

        <div class="topProductImage">
            <img src="../laptop.png" alt="laptop">

        </div>


    </div>
    
    <div class="mainContent">
        {#each data.products as product}

        <div class="productContainer">
            <div class="productImage">
                <img src={product.imageUrls[0]} alt="idk">
            </div>
            <h2>{product.name}</h2>
            <span class="priceAndCart">
                <h3>{product.price} LYD</h3>
                <button on:click={shlal}>Add To Cart</button>
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

    }

    .topPanel {
        margin: 0 15em;
        min-height: 25em;
        max-height: 40em;

        display: flex;
        flex-direction: row;


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
        background-color: rgb(225, 225, 225);
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        min-height: 100vh;
        height: 100%;

        padding: 3em 6em;

        display: grid;
        grid-template-columns: auto auto auto auto;
        row-gap: 4em;
        column-gap: 4em;

    }

    .mainContent .productContainer {
        min-height: 18em;
        min-width: 15em;

        width: fit-content;
        

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

    .mainContent .productContainer .priceAndCart > button {
        cursor: pointer;
        border-radius: 5px;
        border: 2px solid red;
        background-color: white;
        color: red;
        padding: 5px 15px;
        box-shadow: 0 4px 0 red, 2px 12px 10px transparent;

        margin-bottom: 0.5em;
    }
    
    .mainContent .productContainer .priceAndCart > button:hover {
        background-color: rgb(225, 225, 225);
    }

    .mainContent .productContainer .priceAndCart > button:active {
        transform: translate(0, 2px);
		box-shadow: 0 1px 0 red, 2px 6px 10px transparent;

    }
    
    img {
        height: 100%;
        width: 100%;

        object-fit: contain
    }


</style>
<script>
    import Icon from '@iconify/svelte';

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
            <a href="/profile" > <Icon icon="material-symbols:rocket-rounded" width="2.2em" height="2.2em" color ="red" /></a>
            <a href="/cart" ><Icon icon="mdi:cart" width="2em" height="2em" color = "red;"/></a>

        </div>
    </div>

 
    <div class="content">
        <slot />


    </div>


</body>
</main>


<style>

    * {
        margin: 0;
        padding: 0;
        font-family: Arial;
        box-sizing: border-box;

    }

    body {
        background-color: #202020;
    }

    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        margin: 0 18em;

    }

    .header .searchBarContainer {
        background-color: rgb(225, 225, 225);
        min-height: fit-content;
        max-width: 70%;

        height: 3.5em;
        width: 70%;

        border-radius: 10px;
        border: solid red;
        box-shadow: 0 4px 0 red, 2px 12px 10px transparent;

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
        border: 2px solid red;
        color: black;
        background-color:rgb(225, 225, 225);
        width: 10%;
        padding: 2px;
        margin-left: 5px;
        box-shadow: 0 4px 0 red, 2px 12px 10px transparent;
		transform: translate(0, -4px);
		transition: all 0.02s;

    }

    .header .searchBarContainer .searchButton:hover {
        background-color: rgb(225, 225, 225);
    }

    .header .searchBarContainer .searchButton:active {
		transform: translate(0, -1px);
		box-shadow: 0 1px 0 red, 2px 6px 10px transparent;
	}
    
    

</style>
<script>
    import Icon from '@iconify/svelte';

    export let data;

    function toggleOption(event) {
        const target = event.currentTarget;
        const options = document.querySelectorAll('.navOptions > a');

        options.forEach((option) => {
            if(option == target) {
                option.style.color = 'white';

            } else {
                option.style.color = 'hsl(0, 0%, 43%)';
            
            }
        });
    }

</script>


<main>
<body>

    <div class="container">

        <div class="optionsContainer">
            <div class="title">
                <a href="/"><Icon icon="fa6-solid:arrow-left" width="24" height="24" /></a>
                <h1 style="padding-left: 0.2em">User Profile</h1>

            </div>
            
            <div class="navOptions">
                <a href="/{data.userID}" id="information" on:click={toggleOption}> <Icon icon="fa6-solid:user" width="24" height="24" style="padding-right: 0.5em"/>Information</a>
                <a href="/{data.userID}/favorites" id="favorites" on:click={toggleOption}><Icon icon="fa6-solid:heart" width="24" height="24" style="padding-right: 0.5em"/>Favorites</a>
                <a href="/{data.userID}/orders" id="orders" on:click={toggleOption}><Icon icon="fa6-solid:box" width="24" height="24" style="padding-right: 0.5em"/>Orders</a>
                <a href="/{data.userID}/contact" id="contact" on:click={toggleOption}><Icon icon="fa6-solid:message" width="24" height="24" style="padding-right: 0.5em"/>Contact</a>
                <a href="/{data.userID}/settings" id="settings" on:click={toggleOption}><Icon icon="fa6-solid:gear" width="24" height="24" style="padding-right: 0.5em"/>Settings</a>

                
            </div>    
        </div>
        
        <div class="selectedOptionContainer">
            
            <slot />
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
        font-family: Arial;
        margin: 0;
        padding: 0;
        box-sizing: border-box;

        color: #6e6e6e;

    }

    body {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 100vh;
    }

    .container {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;

        margin: 1em 18em;

    }

    .title {
        display: flex;
        flex-direction: row;
        align-items: baseline;

    }

    .optionsContainer {
        background-color: #202020;
        flex: 40%;

        max-width: 20em;
        max-height: 30em;

        min-height: 20em;

        border-radius: 5px;

        display: flex;
        flex-direction: column;

        padding: 1em;
    }

    .navOptions {
        height: 50%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        font-size: 1.2em;

    }

    .navOptions > a {
        display: flex;
        flex-direction: row;

    }

    .selectedOptionContainer {
        background-color: #202020;
        flex: 60%;
        
        min-width: 30em;
        max-width: 30em;
        
        min-height: 38em;
        max-height: 43em;

        overflow: auto;

        border-radius: 5px;

    }

    a {
        cursor: pointer;
        text-decoration: none;

        display: block;
        
    }

    a:hover {
        color: white;

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
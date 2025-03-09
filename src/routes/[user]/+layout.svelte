<script>
    import Icon from '@iconify/svelte';

    function toggleOption(event) {
        const target = event.currentTarget;
        const options = document.querySelectorAll('.navOptions > a');

        options.forEach((option) => {
            if(option == target) {
                option.style.color = 'black';
                option.style.backgroundColor = '#dcdcdc';

            } else {
                option.style.color = 'hsl(0, 0%, 43%)';
                option.style.backgroundColor = '#e6e6e6';
            }

        });
    }

</script>


<main>
<body>

    <div class="optionsContainer">
        <h1>User Profile</h1>

        <div class="navOptions">
            <a href="/profile" id="information" on:click={toggleOption} style="color: black; background-color: #e6e6e6"><Icon icon="material-symbols:account-circle" width="24" height="24" /> Information</a>
            <a href="/profile/favorites" id="favorites" on:click={toggleOption}><Icon icon="material-symbols:favorite-rounded" width="24" height="24" /> Favorites</a>
            <a href="/profile/orders" id="orders" on:click={toggleOption}><Icon icon="material-symbols:package-2" width="24" height="24" /> Orders</a>
            <a href="/profile/contact" id="contact" on:click={toggleOption}><Icon icon="ic:baseline-message" width="24" height="24" /> Contact</a>

        </div>    
    </div>

    <div class="selectedOptionContainer">

        <slot />
    </div>
</body>
</main>


<style>

    * {
        font-family: Arial;
        margin: 0;
        padding: 0;
        box-sizing: border-box;

        color: hsl(0, 0%, 43%);

    }

    body {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        margin: 1em 18em;

    }

    .optionsContainer {
        background-color: #e6e6e6;
        flex: 40%;

        max-width: 20em;
        max-height: 30em;

        min-height: 20em;

        border-radius: 5px;

        display: flex;
        flex-direction: column;

        padding: 1em;
    }

    .selectedOptionContainer {
        background-color: #e6e6e6;
        flex: 60%;
        
        max-width: 38em;
        min-height: 38em;

        border-radius: 5px;

    }

    h1 {
        color: black;
    }

    a {
        cursor: pointer;
        text-decoration: none;

        display: block;

        font-size: large;
        padding: 0.3em 0.5em;
        
    }

    a:hover {
        border-radius: 5px;
        background-color: #dcdcdc;

        color: black;

    }

    

</style>
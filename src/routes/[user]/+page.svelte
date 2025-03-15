<script>
    import Icon from '@iconify/svelte';

    export let data;
    const user = data.userInfo;

    let city = "";
    let street = "";
    let address = "";

    let alertMessage = "";

    function editAddress() {
        const userAddress = document.getElementById("userAddress");
        const editAddressForm = document.getElementById("editAddressForm");

        userAddress.style = "display: none";
        editAddressForm.style = "display: flex";

    }

    async function saveAddress() {

        if(!city.trim() || !street.trim() || !address.trim()) {
            alertMessage = "Enter a valid address!";
            return;

        }


        const fullAddress = city + ", " + street + " " + address;
        let formData = new FormData();
        formData.append("userID", data.userID);
        formData.append("address", fullAddress);

        try {
            const response = await fetch("/api/addAddress", {
            method: "POST",
            body: formData

        });

        if (response.ok) {
            alertMessage = "";
            const userAddress = document.getElementById("userAddress");
            const editAddressForm = document.getElementById("editAddressForm");

            userAddress.innerHTML = fullAddress;

            userAddress.style = "display: block";
            editAddressForm.style = "display: none";


        }

        } catch (error) {
            console.log("An error occured:", error);
            alertMessage = "An error occured", error;

        }
    }

</script>

<main>
<body>
    <h2 style="text-align: center; margin-top: 0.5em;">Profile Informaiton</h2>

    <div class="container">
        <h3>Full Name:</h3>
        <p>{user.fullName}</p>
        
        <h3>Email Address:</h3>
        <p>{user.email}</p>

        <h3>Phone Number:</h3>
        <p>{user.phoneNumber}</p>

        <h3>Address: <button class="editAddress" on:click={editAddress}><Icon icon="fa6-solid:pen-to-square" width="20" height="20" /></button></h3>
        <p id="userAddress">
            {#if user.address}
                {user.address}
            {:else}
                No address.
            {/if}
        </p>
        <form action="submit" id="editAddressForm" on:submit|preventDefault={saveAddress}>
            
            <label for="city">City:</label>
            <input type="text" id="city" bind:value={city}>

            <label for="street">Street:</label>
            <input type="text" id="street" bind:value={street}>

            <label for="address">Detailed address:</label>
            <textarea name="address" id="address" bind:value={address}></textarea>

            <button type="submit" id="saveAddress">Save</button>
            <p style="color:white">{alertMessage}</p>
        </form>
    </div>
    

</body>
</main>


<style>

    *{
        font-family: Arial, Helvetica, sans-serif;
        padding: 0;
        margin: 0;
        box-sizing: border-box;

    }
    

    .container {
        padding: 1em;
    }

    .container > p {
        padding-bottom: 1em;
    }

    .editAddress {
        color: #9f9f9f;
        border: none;
        background: none;

        cursor: pointer;
    }

    form {
        margin: 0.8em 0.5em;
        display: flex;
        flex-direction: column;
        
    }

    form input {
        margin-bottom: 1em;
        margin-right: 10em;

        padding: 1px;
        background-color: #e6e6e6;

        border: solid #e1e1e1;
        border-radius: 2px;

    }

    form textarea {
        padding: 1px;
        background-color: #e6e6e6;

        border: solid #e1e1e1;
        border-radius: 2px;

    }

    form input:focus {
        background-color: white;
        border: solid #202020;
        border-radius: 2px;
        outline: none;

    }

    form textarea:focus {
        background-color: white;
        border: solid #202020;
        border-radius: 2px;
        outline: none;

    }

    form button {
        margin: 2em 10em;
        padding: 0.4em 0;
        cursor: pointer;

    }

    #editAddressForm {
        display: none;

    }
    
</style>
<script>
    import { auth } from "$lib/firebase";
    import { deleteUser, signOut } from "firebase/auth";
    import { goto } from "$app/navigation";

    export let data;
    let alertMessage = "";

    async function deleteCurrentUser() {

        try {
            const user = auth.currentUser;
            const userEmail = data.email;

            console.log(userEmail);

            alertMessage = "Deleting account...";
            const response = await fetch("/api/deleteUser", {
                    method: "DELETE",
                    body: JSON.stringify(userEmail)
    
                });

            if (response.ok) {
                await deleteUser(user);
                alertMessage = "Account deleted";
                console.log(alertMessage);
                goto("/signup");
                    
            }
            
        } catch (error) {
            alertMessage = "Could not delete account", error.message;
            console.log(alertMessage);
            
        }
    }

    async function signOutUser() {
        await signOut(auth).then(() => {
            console.log("Signed out user!");
            goto("/signup");

        }).catch((error) => {
            alertMessage = "An error occured:", error.message;
            console.log("An error occured while signing in");
        });
    }

</script>


<main>
<body>

    <h2 style="text-align: center; margin-top: 0.5em;">Account Settings</h2>
    
    <div class="container">
        <button id="deleteAccountButton" on:click={deleteCurrentUser}>Delete account</button>
        <button id="signOutButton" on:click={signOutUser}>Sign out</button>

        <p style="color: white;">{alertMessage}</p>

    </div>


</body>
</main>


<style>

    * {
        font-family: Arial, Helvetica, sans-serif;

    }

    .container {
    
        width: 50%;
        padding: 1em;

        display: flex;
        flex-direction: column;
        align-items: start;
        row-gap: 0.5em;

    }

    button {
        cursor: pointer;
    }
   

</style>
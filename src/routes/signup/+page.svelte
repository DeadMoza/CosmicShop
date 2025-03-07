<script>
    import Icon from '@iconify/svelte';
    import { auth } from '$lib/firebase';
    import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';

    const storeName = "Cosmic";

    let alertMessage = "";
    
    let fullName = "";

    let email = "";
    let phoneNumber = "";

    let password = "";
    let passwordRepeat = ""


    function togglePassword() {
        const field = document.getElementById("password");
        const fieldRepeat = document.getElementById("passwordRepeat");

        if(field.type == 'password') { 
            field.type = 'text';
            fieldRepeat.type = 'text';

        }

        else {
            field.type = 'password';
            fieldRepeat.type = 'password';

        }
    }

    async function signup() {
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;

            await updateProfile(user, { displayName: fullName});

            sendEmailVerification(user);
            alertMessage = "A verification link has been sent to your email";

        } catch (error) {
            alertMessage = error.message;
            
        }
    }

</script>

<main>
<body>

    <div class="page">  
        
        <form class="container" on:submit|preventDefault={signup}>
            
            
            <div class="back_to_store_button"> <a href="/"><Icon icon="fa-solid:store-alt" /> <Icon icon="mdi:keyboard-return" /></a> </div>
            <div class="upper_container">
                
                <img src="../../CosmicLogo.png" alt="cosmic logo"> 
                
                <h2>Welcome To {storeName}</h2>

                <h3>Create a new account</h3>
            </div>
            
            <div class="lower_container">
                <div class="field" style="margin-bottom: 1.5em">
                    
                    <label for="fullName"> <Icon icon="fa6-solid:user" style="font-size: 1.55em; color: #e1e1e1;"/></label>
                    <input id="fullName" type="text" placeholder="Name and surname" required bind:value={fullName}>
                </div>
                <div class="field">
                    
                    <label for="email"> <Icon icon="fa6-solid:envelope" style="font-size: 1.4em; color: #e1e1e1;"/></label>
                    <input id="email" type="email" placeholder="Email adress" required bind:value={email}>
                </div>
                <div class="field" style="margin-bottom: 1.5em">
                    
                    <label for="phoneNumber"> <Icon icon="fa6-solid:phone" style="font-size: 1.4em; color: #e1e1e1;"/></label>
                    <input id="phoneNumber" type="tel" placeholder="09X-XXXXXXX" required bind:value={phoneNumber}>
                </div>
                
                <div class="field">
                    
                    <label for="password"><Icon icon="fa6-solid:lock" style="font-size: 1.5em; color: #e1e1e1;" /></label>
                    <input id="password" type="password" placeholder="Enter Password" required bind:value={password}>
                    <button id="togglePasswordButton" type="button" on:click={togglePassword} class="togglePasswordButton"> <Icon icon="fa6-solid:eye"/></button>
                </div>
                <div class="field">
                    <label for="passwordRepeat"><Icon icon="fa6-solid:repeat" style="font-size: 1.3em; color: #e1e1e1;" /></label>
                    <input id="passwordRepeat" type="password" placeholder="Re-Enter Password" required bind:value={passwordRepeat}>

                </div>   
                
            </div>
            

            <button type="submit">Create account</button>
            <p>Already have an account? <a href="/login">Sign in</a></p>
            <p style="color:white; margin-top: 1em;">{alertMessage}</p>
            <p style="margin-top: 1em">By creating an account you agree to the <a href=" ">Terms of service</a></p>

        </form>
        
   
        
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
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Arial;


    }
    a:hover {
        color: white;
    }

    .page {
        color: #e1e1e1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        min-height: 100vh;
        background-color: #e1e1e1;

    }

    .container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        background-color: #202020;
        border-radius: 8px;
        
        padding: 1em;

        max-width: 27em;
        width: 100%;

        min-height: 35em;
        height: 100%;
        
    }
    
    .upper_container {
        text-align: center;
    }

    .back_to_store_button {

        position: absolute;
        align-self: flex-start;

        margin: 0.5em;

        width: 1.5em;
        height: 1.5em;
    }


    img {
        width :180px;
        height: 180px;

    }

    .lower_container {
        width: 100%;
    }

    

    .lower_container .field {
        width: 100%;
        height: 50px;

        display: flex;
        align-items: center;

        margin: 10px 0;
        padding: 0 40px;
    }

    .field input {
        width: 100%;
        height: 100%;

        border: solid #e1e1e1;
        border-radius: 10px;

        padding: 0 5px;
        margin-left: 20px;
    }

    .field input:focus {
        background-color: #e1e1e1;
        border: solid #202020;
        outline: none;

    }

    button {
        cursor: pointer;
        border-radius: 5px;
        border: 2px solid #e1e1e1;
        color: black;
        background-color:white;
        width: 40%;
        padding: 14px 20px;
        margin-bottom: 8px;

    }

    .togglePasswordButton {
        cursor: pointer;
        background-color: transparent;
        color: #e1e1e1;
        width: 1em;
        height: 1em;
        font-size: 1em;
        border: none;
        outline: none;

        padding: 0;

        margin: 0 0.8em;
        

    }

    .togglePasswordButton:hover {
        color: white;
        background-color: transparent;
    }

    button:hover {
        background-color: #e1e1e1;
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


    a {
        text-decoration: none;
        color: #e1e1e1;

    }
    
    .back_to_store_button a {        
        font-size: 1.5em;
    }

    a:hover {
        text-decoration: none;

    } 

    

    
    
</style>
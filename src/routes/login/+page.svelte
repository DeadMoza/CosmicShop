<script>
    import { auth } from "$lib/firebase";
    import { signInWithEmailAndPassword } from "firebase/auth";
    import Icon from '@iconify/svelte';
    import { goto } from '$app/navigation';

    const storeName = "Cosmic";

    let email = "";
    let password = "";

    let alertMessage = "";

    const getErrorMessage = (errorCode) => {
    const errorMap = {
        "auth/invalid-credential": "Incorrect email or password", 
        "auth/user-not-found": "User not found. Please sign up.",
        "auth/wrong-password": "Incorrect password. Try again.",
        "auth/too-many-requests": "Too many failed attempts. Try again later.",
        "auth/network-request-failed": "Network error. Check your connection.",
        "auth/internal-error": "Something went wrong. Try again later."
    };

        return errorMap[errorCode] || "An unexpected error occurred.";
    };
    
    async function login() {
        try {
            if(!email || !password) {
                alertMessage = "Fields cannot be empty!"
                return;
            }
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;
            if(!user.emailVerified) {
                alertMessage = "Please verify email before logging in.";
                return;

            }
            goto("/");

        } catch (error) {
            alertMessage = getErrorMessage(error.code);
        }
    }

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

</script>

<main>
<body>

    <div class="page">  
        
        <div class="container">
            
            
            <div class="back_to_store_button"> <a href="/"><Icon icon="fa-solid:store-alt" /> <Icon icon="mdi:keyboard-return" /></a> </div>
            <div class="upper_container">
                
                <img src="../../CosmicLogo.png" alt="cosmic logo"> 
                
                <h2>Welcome To {storeName}</h2>

                <h3>Sign in to your account</h3>
            </div>
            
            <div class="lower_container">
                <div class="field">
                    
                    <label for="email"> <Icon icon="fa6-solid:envelope" style="font-size: 1.4em; color: #e1e1e1;"/></label>
                    <input id="email" type="email" placeholder="Email Address" required bind:value={email}>
                </div>
                
                <div class="field">
                    
                    <label for="password"><Icon icon="fa6-solid:lock" style="font-size: 1.5em; color: #e1e1e1;" /></label>
                    <input id="password" type="password" placeholder="Enter Password" required bind:value={password}>
                    <button id="togglePasswordButton" type="button" on:click={togglePassword} class="togglePasswordButton"> <Icon icon="fa6-solid:eye"/></button>
                </div>

                <div class="extraControls">
                    <div class="rememberMe">
                        <input type="checkbox" id="rememberMe">
                        <label for="rememberMe">Remember Me</label>
                    </div>    
                    <a href="/login/passwordReset">Forgot your password?</a>

                </div>
                
                
            </div>
            
            <button on:click={login}>Log in</button>
            <p style="color: white;">{alertMessage}</p>
            <p>Don't have an account? <a href="/signup">Create a new account</a></p>            
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

    .extraControls {
        margin: 20px 40px;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        
        
        
    }

    #rememberMe {
        margin-right: 8px;
    }

    button {
        cursor: pointer;
        border-radius: 5px;
        border: 2px solid #e1e1e1;
        color: black;
        background-color:white;
        width: 35%;
        padding: 14px 20px;
        margin-bottom: 8px;

    }

    button:hover {
        background-color: #e1e1e1;
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
<script>
    import { auth } from "$lib/firebase";
    import { sendPasswordResetEmail } from "firebase/auth";
    import Icon from '@iconify/svelte';

    let email = "";
    let alertMessage = "";
    let returnLink = "";

    async function resetPassword() {
        if (!email) {
            alertMessage = "Please enter a valid email address!";
            return;

        }

        try {
            await sendPasswordResetEmail(auth, email);
            alertMessage = "An email has been sent to you, Check your inbox.";
            returnLink = "Return to login.";

        } catch (error) {
            console.log(error.message);
            alertMessage = "Incorrect email address, Try again."; 
        }
    }

</script>

<main>
<body>
<div class="page">

    <div class="container">       
        <div class="upper_container">
            
            <img src="../../CosmicLogo.png" alt="cosmic logo"> 
            
            <h2>Reset your password.</h2>
            <h3>Enter your email below</h3>
            
        </div>
        <div class="lowerContainer">
            <div class="field"> 
                <label for="email"> <Icon icon="fa6-solid:envelope" style="font-size: 1.6em; color: #e1e1e1;"/></label>
                <input id="email" type="email" placeholder="Email Address" required bind:value={email}>
            </div>
            
        </div>
        
        <button on:click={resetPassword}>Reset</button>
        <p style="color: white; text-align: center;">{alertMessage} <br> <a href="/login">{returnLink}</a></p>
        
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

    .page {
        color: #e1e1e1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        min-height: 100vh;
        background-color: #e1e1e1;

    }

    a:hover {
        color: white;
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

        min-height: 30em;
        height: 100%;

        color: #e1e1e1;
        
    }
    
    .upper_container {
        text-align: center;
    }

   

    img {
        width :180px;
        height: 180px;

    }

    .lowerContainer {
        width: 100%;
    }

    

    .lowerContainer .field {
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
        width: 35%;
        padding: 14px 20px;
        margin-bottom: 8px;

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
    
   

    a:hover {
        text-decoration: none;

    } 

    

    
    
</style>
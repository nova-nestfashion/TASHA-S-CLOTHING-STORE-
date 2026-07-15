import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


document.getElementById("loginBtn").addEventListener("click", function(){

    alert("Login button pressed");

    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;


    signInWithEmailAndPassword(auth, email, password)

    .then((result)=>{

        alert("Welcome Admin");

        window.location.href = "admin.html";

    })

    .catch((error)=>{

        alert("Error: " + error.message);

    });

});
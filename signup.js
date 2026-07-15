import { auth } from "./firebase.js";

import {
createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



document.getElementById("signupBtn").onclick=function(){


const email=document.getElementById("email").value;

const password=document.getElementById("password").value;



createUserWithEmailAndPassword(auth,email,password)

.then((userCredential)=>{


localStorage.setItem("customerLoggedIn","true");


alert("Account created successfully");


window.location.href="index.html";


})


.catch((error)=>{


alert(error.message);


});


};
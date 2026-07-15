import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

document.getElementById("loginBtn").onclick = function () {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)

    .then((userCredential) => {

    localStorage.setItem("customerLoggedIn", "true");

    alert("Login successful");

    window.location.href = "index.html";

})

    .catch((error) => {

        alert(error.message);

    });

};
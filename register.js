import { auth } from "./firebase.js";

import {
createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


window.register = async function(){


const email = document.getElementById("email").value;

const password = document.getElementById("password").value;



try{


await createUserWithEmailAndPassword(
auth,
email,
password
);


alert("Account created successfully");


window.location.href="login-user.html";


}
catch(error){

alert(error.message);

}


};
import { db } from "./firebase.js";

import {
collection,
getDocs,
doc,
deleteDoc,
addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const adminLoggedIn = localStorage.getItem("adminLoggedIn");


if(adminLoggedIn !== "true"){

window.location.href="login.html";

}


// Add Product

document.getElementById("addBtn").onclick = async function(){


const name = document.getElementById("name").value;
const price = document.getElementById("price").value;
const category = document.getElementById("category").value;
const stock = document.getElementById("stock").value;
const image = document.getElementById("image").value;


await addDoc(collection(db,"products"),{

name:name,

price:Number(price),

category:category,

stock:Number(stock),

image:image

});


alert("Product Added Successfully");

location.reload();

};



// Load Products

async function loadProducts(){

const box = document.getElementById("adminProducts");

box.innerHTML="";


const snapshot = await getDocs(collection(db,"products"));


snapshot.forEach((item)=>{


const product = item.data();


box.innerHTML += `

<div class="product-card">

<img src="${product.image}" width="150">

<h3>${product.name}</h3>

<p>Price: K${product.price}</p>

<p>Category: ${product.category}</p>

<p>Stock: ${product.stock}</p>


<button onclick="deleteProduct('${item.id}')">
Delete
</button>


</div>

`;

});


}



window.deleteProduct = async function(id){

await deleteDoc(doc(db,"products",id));

alert("Product deleted");

location.reload();

};



// Logout

window.logout = function(){

localStorage.removeItem("adminLoggedIn");

window.location.href="login.html";

};



loadProducts();

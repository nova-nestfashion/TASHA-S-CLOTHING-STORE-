import { db } from "./firebase.js";

import {
collection,
getDocs,
doc,
deleteDoc,
updateDoc,
addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


if(localStorage.getItem("adminLoggedIn") !== "true"){

window.location.href="login.html";

}


const adminProducts = document.getElementById("adminProducts");


// Dashboard

async function loadDashboard(){

const productsSnapshot = await getDocs(collection(db,"products"));

let lowStock = 0;

productsSnapshot.forEach((item)=>{

const product = item.data();

if((product.stock || 0) <= 5){

lowStock++;

}

});


const ordersSnapshot = await getDocs(collection(db,"orders"));

let orders = 0;
let pending = 0;
let sales = 0;


ordersSnapshot.forEach((item)=>{

const order = item.data();

orders++;

if(order.status === "Pending"){

pending++;

}

sales += Number(order.total || 0);

});


document.getElementById("totalProducts").innerHTML =
productsSnapshot.size;

document.getElementById("totalOrders").innerHTML =
orders;

document.getElementById("pendingOrders").innerHTML =
pending;

document.getElementById("totalSales").innerHTML =
"K"+sales;

document.getElementById("lowStockProducts").innerHTML =
lowStock;

}



// Add Product

document.getElementById("addBtn").onclick = async function(){


await addDoc(collection(db,"products"),{


name:document.getElementById("name").value,

price:Number(document.getElementById("price").value),

category:document.getElementById("category").value,

stock:Number(document.getElementById("stock").value),

image:document.getElementById("image").value


});


alert("Product added successfully");


location.reload();


};



// Display Products

async function loadAdminProducts(){

adminProducts.innerHTML="";


const snapshot = await getDocs(collection(db,"products"));


snapshot.forEach((docSnap)=>{


const product = docSnap.data();


adminProducts.innerHTML += `

<div class="product-card">

<img src="${product.image}" width="150">

<h3>${product.name}</h3>

<p>K${product.price}</p>

<p>${product.category}</p>

<p>Stock: ${product.stock}</p>


<button onclick="deleteProduct('${docSnap.id}')">
Delete
</button>


</div>

`;


});


}




window.deleteProduct = async function(id){

await deleteDoc(doc(db,"products",id));

alert("Deleted");

location.reload();

};



// Logout

window.logout=function(){

localStorage.removeItem("adminLoggedIn");

window.location.href="login.html";

};



loadDashboard();

loadAdminProducts();

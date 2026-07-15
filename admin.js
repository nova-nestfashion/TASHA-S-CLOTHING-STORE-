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



const adminProducts=document.getElementById("adminProducts");



// Dashboard

async function loadDashboard(){

const productsSnapshot=await getDocs(collection(db,"products"));
  let lowStockProducts = 0;
productsSnapshot.forEach((docSnap)=>{

const product = docSnap.data();

if((product.stock || 0) <= 5){

lowStockProducts++;

}

});
const ordersSnapshot=await getDocs(collection(db,"orders"));


let totalOrders=0;

let pendingOrders=0;

let totalSales=0;




ordersSnapshot.forEach((doc)=>{

const order=doc.data();

totalOrders++;

if(order.status==="Pending"){

pendingOrders++;

}

totalSales += Number(order.total);

});



document.getElementById("totalProducts").innerHTML=productsSnapshot.size;

document.getElementById("totalOrders").innerHTML=totalOrders;

document.getElementById("pendingOrders").innerHTML=pendingOrders;

document.getElementById("totalSales").innerHTML="K"+totalSales;
document.getElementById("lowStockProducts").innerHTML = lowStockProducts;
}




// Add Product

document.getElementById("addBtn").onclick=async function(){


await addDoc(collection(db,"products"),{

name:name.value,

price:Number(price.value),

category:category.value,

stock:Number(stock.value),

image:image.value,

featured: featured.checked

sizes: sizes.value
.split(",")
.map(size => size.trim()),

colors: colors.value
.split(",")
.map(color => color.trim())

});


alert("Product added");

location.reload();

};





// Products

async function loadAdminProducts(){

adminProducts.innerHTML="";


const snapshot=await getDocs(collection(db,"products"));


snapshot.forEach((docSnap)=>{


const product=docSnap.data();


adminProducts.innerHTML += `

<div class="product-card">

<img src="${product.images ? product.images[0] : product.image}" width="150">

<h3>${product.name}</h3>

<p>K${product.price}</p>

<p>${product.category}</p>

<p><strong>Stock:</strong> ${product.stock ?? 0}</p>


<button onclick="deleteProduct('${docSnap.id}')">

Delete

</button>
<button onclick="editProduct('${docSnap.id}')">

Edit

</button>

</div>

`;

});


}




window.deleteProduct=async function(id){

await deleteDoc(doc(db,"products",id));

alert("Product deleted");

location.reload();

};





// Orders with status buttons

async function loadOrders(){


const ordersDiv=document.getElementById("orders");

ordersDiv.innerHTML="";


const snapshot=await getDocs(collection(db,"orders"));



snapshot.forEach((docSnap)=>{


const order=docSnap.data();



ordersDiv.innerHTML += `


<div class="product-card">


<h3>${order.customerName}</h3>


<p>Phone: ${order.phone}</p>

<p>Address: ${order.address}, ${order.town}</p>

<p>Total: K${order.total}</p>

<h4>Items:</h4>

${
order.items.map(item => 
`
<p>
${item.name} x${item.quantity} - K${item.subtotal}
</p>
`
).join("")
}

<p>Status: ${order.status}</p>


<select onchange="changeStatus('${docSnap.id}',this.value)">

<option value="Pending">
Pending
</option>

<option value="Processing">
Processing
</option>

<option value="Delivered">
Delivered
</option>

<option value="Cancelled">
Cancelled
</option>

</select>


</div>


`;



});


}




window.changeStatus=async function(id,status){


await updateDoc(doc(db,"orders",id),{

status:status

});


alert("Order updated");


location.reload();


};




window.editProduct = async function(id){

const name = prompt("Enter product name:");

const price = prompt("Enter price:");

const category = prompt("Enter category:");

const stock = prompt("Enter stock:");

const image = prompt("Enter main image link:");
  const featured = confirm("Show as featured product?");
const sizes = prompt("Enter sizes (S,M,L,XL):");

const colors = prompt("Enter colors (Black,White,Blue):");


if(!name || !price || !category || !stock){

alert("All fields required");

return;

}



await updateDoc(doc(db,"products",id),{

name:name,

price:Number(price),

category:category,

stock:Number(stock),

image:image,
featured: featured,
sizes:sizes.split(",").map(size=>size.trim()),

colors:colors.split(",").map(color=>color.trim())

});



alert("Product updated successfully");

location.reload();


};
window.logout=function(){

localStorage.removeItem("adminLoggedIn");

window.location.href="login.html";

}



loadDashboard();

loadAdminProducts();

loadOrders();
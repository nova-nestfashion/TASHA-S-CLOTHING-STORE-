import { db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const productsDiv = document.getElementById("products");
const featuredDiv = document.getElementById("featuredProducts");
const search = document.getElementById("search");

const categoryFilter = document.getElementById("categoryFilter");


let allProducts = [];

let cart = JSON.parse(localStorage.getItem("cart")) || [];



// Load products

async function loadProducts(){


const snapshot = await getDocs(collection(db,"products"));


allProducts = [];


snapshot.forEach((doc)=>{

allProducts.push({

id:doc.id,

...doc.data()

});

});


displayProducts(allProducts);


displayFeatured(
allProducts.filter(product => product.featured === true)
);


}




// Display products

function displayProducts(products){


productsDiv.innerHTML="";


products.forEach((product)=>{


productsDiv.innerHTML += `


<div class="product-card" onclick="viewProduct('${product.id}')">


<img
id="img${product.id}"
src="${product.images ? product.images[0] : product.image}"
>

${
product.featured
?
`<span class="badge">⭐ Featured</span>`
:
""
}
<h3>${product.name}</h3>


<p>${product.category || ""}</p>

<p>K${product.price}</p>
<button onclick="event.stopPropagation(); viewProduct('${product.id}')">

View Details

</button>
<p><strong>Stock:</strong> ${product.stock ?? 0}</p>

${
(product.stock ?? 0) > 0
?
`<button onclick="event.stopPropagation(); addToCart('${product.id}','${product.name}','${product.price}','${product.image}')">
Add To Cart
</button>`
:
`<button disabled>
Out of Stock
</button>`
}


</div>


`;



});


}



function displayFeatured(products){

featuredDiv.innerHTML="";


products.forEach(product=>{


featuredDiv.innerHTML += `

<div class="product-card"
onclick="viewProduct('${product.id}')">


<img src="${product.images ? product.images[0] : product.image}">


<h3>${product.name}</h3>


<p>K${product.price}</p>


<button>
View
</button>


</div>

`;

});


}
// Search

search.addEventListener("input",()=>{


const text = search.value.toLowerCase();


const filtered = allProducts.filter(product =>

product.name.toLowerCase().includes(text)

);


displayProducts(filtered);


});





// Category filter

categoryFilter.addEventListener("change",()=>{


const category = categoryFilter.value;


if(category==="All"){

displayProducts(allProducts);

}

else{


const filtered = allProducts.filter(product =>

product.category === category

);


displayProducts(filtered);


}


});

// Add to cart

window.addToCart=function(id,name,price,image){

const product = allProducts.find(p => p.id === id);

if(!product || (product.stock ?? 0) <= 0){

    alert("This product is out of stock.");

    return;

}
cart.push({

id:id,

name:name,

price:price,

image:image,

quantity:1

});


localStorage.setItem("cart",JSON.stringify(cart));


alert("Added to cart");


}



window.changeImage=function(id,image){

document.getElementById("img"+id).src=image;

}
window.viewProduct = function(id){

    window.location.href = "product.html?id=" + id;

};
loadProducts();
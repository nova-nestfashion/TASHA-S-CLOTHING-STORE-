import { db } from "./firebase.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const productDetails = document.getElementById("productDetails");
let currentProduct;

// Get product ID from URL

const urlParams = new URLSearchParams(window.location.search);

const productId = urlParams.get("id");

if(!productId){
    productDetails.innerHTML = "<h2>No product selected</h2>";
    throw new Error("Product ID missing");
}



async function loadProduct(){


    const productRef = doc(db,"products",productId);


    const productSnap = await getDoc(productRef);



    if(productSnap.exists()){


        const product = productSnap.data();
currentProduct = product;


        productDetails.innerHTML = `


        <div class="product-card">


        <div class="main-image">

<img 
id="mainProductImage"
src="${product.images ? product.images[0] : product.image}"
>

</div>


<div class="image-gallery">

${
product.images ?
product.images.map((img)=>`

<img 
src="${img}"
onclick="changeMainImage('${img}')"
width="70"
>

`).join("")
:
""

}

</div>


        <h2>${product.name}</h2>

<h3>K${product.price}</h3>

<p>Category: ${product.category}</p>

<p>${product.description || "No description available"}</p>


<label>Size:</label>

<select id="size">

${
product.sizes ?
product.sizes.map(size=>`

<option value="${size}">
${size}
</option>

`).join("")
:
`<option value="N/A">N/A</option>`
}

</select>


<br><br>


<label>Color:</label>

<select id="color">

${
product.colors ?
product.colors.map(color=>`

<option value="${color}">
${color}
</option>

`).join("")
:
`<option value="N/A">N/A</option>`
}

</select>

<p>
<strong>Stock:</strong> ${product.stock ?? 0}
</p>

<label>Quantity:</label>

<input 
type="number" 
id="quantity" 
value="1" 
min="1"
max="${product.stock ?? 1}"
>

<br><br>

<button onclick="addToCart('${productId}')">
Add to Cart
</button>



        </div>


        `;


    }else{


        productDetails.innerHTML = 
        "<h2>Product not found</h2>";


    }


}



window.addToCart = function(id){


let cart = JSON.parse(localStorage.getItem("cart")) || [];


const quantity = Number(document.getElementById("quantity").value);


const existing = cart.find(item => item.id === id);



if(existing){

    existing.quantity += quantity;


}else{


    cart.push({

id:id,

name:currentProduct.name,

price:currentProduct.price,

image:currentProduct.image,

size:document.getElementById("size").value,

color:document.getElementById("color").value,

quantity:quantity

});



}



localStorage.setItem("cart",JSON.stringify(cart));


alert(quantity + " item(s) added to cart!");



};
window.changeMainImage = function(image){

    document.getElementById("mainProductImage").src = image;

};
loadproduct();
import { db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const productsDiv = document.getElementById("products");
console.log("Products section found:", productsDiv);
const featuredDiv = document.getElementById("featuredProducts");
const search = document.getElementById("search");
const categoryFilter = document.getElementById("categoryFilter");

let allProducts = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

async function loadProducts(){

    alert("Loading products...");

    try{

        const snapshot = await getDocs(collection(db,"products"));

        allProducts = [];

        snapshot.forEach((doc)=>{

            allProducts.push({
                id: doc.id,
                ...doc.data()
            });

        });

        alert("Products loaded: " + allProducts.length);

        displayProducts(allProducts);

        if(featuredDiv){

            displayFeatured(
                allProducts.filter(product => product.featured === true)
            );

        }

    }catch(error){

        alert(error.message);
        console.log(error);

    }

}

function displayProducts(products){

    productsDiv.innerHTML = "";

    if(products.length === 0){

        productsDiv.innerHTML = "<h2>No products available.</h2>";
        return;

    }

    products.forEach(product=>{

        productsDiv.innerHTML += `

        <div class="product-card">

            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p>${product.category}</p>

            <h3>K${product.price}</h3>

            <p>Stock: ${product.stock}</p>

            <button onclick="viewProduct('${product.id}')">
            View Details
            </button>

            ${
            product.stock > 0
            ?
            `<button onclick="addToCart('${product.id}')">
            Add To Cart
            </button>`
            :
            `<button disabled>Out of Stock</button>`
            }

        </div>

        `;

    });

}

function displayFeatured(products){

    if(!featuredDiv) return;

    featuredDiv.innerHTML = "";

    products.forEach(product=>{

        featuredDiv.innerHTML += `

        <div class="product-card">

            <img src="${product.image}">

            <h3>${product.name}</h3>

            <p>K${product.price}</p>

        </div>

        `;

    });

}

window.addToCart = function(id){

    const product = allProducts.find(p=>p.id===id);

    if(!product) return;

    cart.push({

        id:product.id,
        name:product.name,
        price:product.price,
        image:product.image,
        quantity:1

    });

    localStorage.setItem("cart",JSON.stringify(cart));

    alert("Added to cart");

}

window.viewProduct = function(id){

    window.location.href = "product.html?id="+id;

}

if(search){

search.addEventListener("input",()=>{

const text = search.value.toLowerCase();

displayProducts(

allProducts.filter(product=>

product.name.toLowerCase().includes(text)

)

);

});

}

if(categoryFilter){

categoryFilter.addEventListener("change",()=>{

const category = categoryFilter.value;

if(category==="All"){

displayProducts(allProducts);

}else{

displayProducts(

allProducts.filter(product=>

product.category===category

)

);

}

});

}

loadProducts();

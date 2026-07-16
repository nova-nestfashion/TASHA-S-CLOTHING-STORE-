import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const productsDiv = document.getElementById("products");


async function loadProducts(){

    try {

        const snapshot = await getDocs(collection(db,"products"));

        productsDiv.innerHTML = "";

        snapshot.forEach((doc)=>{

            const product = doc.data();

            productsDiv.innerHTML += `

            <div class="product-card">

                <img src="${product.image}">

                <h3>${product.name}</h3>

                <p>Category: ${product.category}</p>

                <p>Price: K${product.price}</p>

                <p>Stock: ${product.stock}</p>

            </div>

            `;

        });


        console.log("Products displayed:", snapshot.size);


    } catch(error){

        console.error(error);

        alert(error.message);

    }

}


loadProducts();

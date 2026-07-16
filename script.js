import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const productsDiv = document.getElementById("products");

async function loadProducts() {

    try {

        productsDiv.innerHTML = "<h2>Loading products...</h2>";

        const snapshot = await getDocs(collection(db, "products"));

        productsDiv.innerHTML = "";

        if (snapshot.empty) {
            productsDiv.innerHTML = "<h2>No products found.</h2>";
            return;
        }

        snapshot.forEach((doc) => {

            const product = doc.data();

            productsDiv.innerHTML += `

            <div class="product-card">

                <img src="${product.image}" alt="${product.name}">

                <h3>${product.name}</h3>

                <p><strong>Category:</strong> ${product.category}</p>

                <p><strong>Price:</strong> K${product.price}</p>

                <p><strong>Stock:</strong> ${product.stock ?? 0}</p>

                <button disabled>Coming Soon</button>

            </div>

            `;

        });

    } catch (error) {

        productsDiv.innerHTML = `
            <h2>Error loading products</h2>
            <p>${error.message}</p>
        `;

        console.error(error);

    }

}

loadProducts();

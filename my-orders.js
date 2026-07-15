import { auth, db } from "./firebase.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const ordersDiv = document.getElementById("orders");

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "customer-login.html";
        return;
    }

    ordersDiv.innerHTML = "<h3>Loading your orders...</h3>";

    const snapshot = await getDocs(collection(db, "orders"));

    ordersDiv.innerHTML = "";

    let found = false;

    snapshot.forEach((doc) => {

        const order = doc.data();

        if (order.customerEmail === user.email) {

            found = true;

            let items = "";

            order.items.forEach(item => {

                items += `
                    <li>
                        ${item.name} × ${item.quantity}
                        - K${item.subtotal}
                    </li>
                `;

            });

            ordersDiv.innerHTML += `

            <div class="product-card">

                <h3>Order</h3>

                <p><strong>Status:</strong> ${order.status}</p>

                <p><strong>Total:</strong> K${order.total}</p>

                <p><strong>Items:</strong></p>

                <ul>
                    ${items}
                </ul>

            </div>

            <br>

            `;
        }

    });

    if (!found) {
        ordersDiv.innerHTML = "<h3>You haven't placed any orders yet.</h3>";
    }

});
import { db, auth } from "./firebase.js";

import {
collection,
query,
where,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const ordersList = document.getElementById("ordersList");


auth.onAuthStateChanged(async (user)=>{


if(!user){

ordersList.innerHTML =
`
<h3>Please login to view your orders</h3>
<a href="customer-login.html">
Login
</a>
`;

return;

}


loadOrders(user.uid);


});



async function loadOrders(uid){


ordersList.innerHTML="";


const q = query(
collection(db,"orders"),
where("customerId","==",uid)
);


const querySnapshot = await getDocs(q);



if(querySnapshot.empty){

ordersList.innerHTML =
"<h3>No orders found</h3>";

return;

}



querySnapshot.forEach((orderDoc)=>{


const order = orderDoc.data();


let items = "";


order.items.forEach(item=>{


items += `

<p>
${item.name} x${item.quantity}
- K${item.subtotal}
</p>

`;

});



ordersList.innerHTML += `

<div class="product-card">

<h3>My Order</h3>

${items}

<h3>Total: K${order.total}</h3>

<p>
Status: ${order.status}
</p>

</div>

`;



});


}
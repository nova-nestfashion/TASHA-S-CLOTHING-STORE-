import { db, auth } from "./firebase.js";

import {
    doc,
    getDoc,
    collection,
    addDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let cart = JSON.parse(localStorage.getItem("cart")) || [];

window.placeOrder = async function(){
const user = auth.currentUser;

if(!user){

    alert("Please login first");

    window.location.href="customer-login.html";

    return;

}
    const name = document.getElementById("customerName").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const town = document.getElementById("town").value;

    if(!name || !phone || !address || !town){

        alert("Please fill in all details");
        return;

    }
if(cart.length === 0){

    alert("Your cart is empty");
    return;

}
    

    let orderItems = [];
    let total = 0;

    for(const item of cart){

        const productRef = doc(db,"products",item.id);

        const productSnap = await getDoc(productRef);

        if(productSnap.exists()){

            const product = productSnap.data();


if(product.stock < item.quantity){

    alert(product.name + " does not have enough stock.");

    return;

}


const subtotal = Number(product.price) * item.quantity;

            total += subtotal;

            orderItems.push({

    name: product.name,

    size: item.size || "N/A",

    color: item.color || "N/A",

    quantity: item.quantity,

    price: product.price,

    subtotal: subtotal

});
await updateDoc(productRef, {

    stock: Number(product.stock) - item.quantity

});
        }

    }

    await addDoc(collection(db,"orders"),{

        customerId: user.uid,
customerEmail: user.email,
        customerName: name,
        phone: phone,
        address: address,
        town: town,
        items: orderItems,
        total: total,
        status: "Pending",
        date: new Date().toISOString()

    });

    alert("Order placed successfully");

    let message =
    "Hello TASHA'S CLOTHING STORE,%0A%0A" +

    "*NEW ORDER*%0A" +

    "Name: " + name + "%0A" +

    "Email: " + user.email + "%0A" +

    "Phone: " + phone + "%0A" +

    "Address: " + address + "%0A" +

    "Town: " + town + "%0A%0A";

    orderItems.forEach(item=>{

        message +=
"• " + item.name +
" | Size: " + item.size +
" | Color: " + item.color +
" | Qty: " + item.quantity +
" - K" + item.subtotal +
"%0A";

    });

    message += "%0A*TOTAL: K" + total + "*";

    localStorage.removeItem("cart");

    const storeNumber = "260978963881";

    window.open(
        "https://wa.me/" + storeNumber + "?text=" + encodeURIComponent(message),
        "_blank"
    );

}
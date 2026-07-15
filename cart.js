const cartItems = document.getElementById("cart-items");
const total = document.getElementById("total");


let cart = JSON.parse(localStorage.getItem("cart")) || [];



function displayCart(){


cartItems.innerHTML = "";


let totalPrice = 0;



if(cart.length === 0){

cartItems.innerHTML = "<h3>Your cart is empty</h3>";

total.innerHTML = "Total: K0";

return;

}



cart.forEach((item,index)=>{


let subtotal = Number(item.price) * item.quantity;


totalPrice += subtotal;



cartItems.innerHTML += `


<div class="cart-item">


<img src="${item.image || 'images/default.png'}">


<div>


<h3>${item.name}</h3>
<p>
Size: ${item.size || "N/A"}
</p>

<p>
Color: ${item.color || "N/A"}
</p>

<p>Price: K${item.price}</p>


<p>

<button onclick="decrease(${index})">
−
</button>


<span>${item.quantity}</span>


<button onclick="increase(${index})">
+
</button>


</p>


<p>
Subtotal: K${subtotal}
</p>


<button onclick="removeItem(${index})">
Remove
</button>


</div>


</div>


`;



});



total.innerHTML = "Total: K" + totalPrice;



}



window.increase = function(index){

cart[index].quantity++;

saveCart();

}



window.decrease = function(index){


if(cart[index].quantity > 1){

cart[index].quantity--;

}

saveCart();


}



window.removeItem = function(index){


cart.splice(index,1);

saveCart();


}



function saveCart(){

localStorage.setItem("cart",JSON.stringify(cart));

displayCart();

}



displayCart();
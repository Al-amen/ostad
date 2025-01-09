function updateCartUI() {
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
  
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartItems.innerHTML = "";
  
    let total = 0;
  
    cart.forEach((item) => {
      const product = products.find((p) => p.id === item.id);
      const itemElement = document.createElement("li");
      itemElement.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)} x ${item.quantity}</span>
        <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)">
      `;
      cartItems.appendChild(itemElement);
      total += product.price * item.quantity;
    });
  
    cartTotal.textContent = total.toFixed(2);
  }
  
  document.getElementById("clear-cart").addEventListener("click", clearCart);
  document.getElementById("checkout").addEventListener("click", () => {
    alert("Checkout feature coming soon!");
  });
  
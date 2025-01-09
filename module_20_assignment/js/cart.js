let cart = [];

// Add to Cart
function addToCart(productId) {
    const product = window.products.find((p) => p.id === productId);

    if (!product) return alert("Product not found!");

    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
}

// Update Cart UI
function updateCartUI() {
    const cartCount = document.getElementById("cart-count");
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);

    cartCount.textContent = total;
}

// View Cart
function viewCart() {
    const cartModal = new bootstrap.Modal(document.getElementById("cart-modal"));
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItemsContainer.innerHTML = "";

    let totalPrice = 0;

    cart.forEach((item) => {
        totalPrice += item.quantity * item.price;

        cartItemsContainer.innerHTML += `
            <div class="cart-item d-flex justify-content-between align-items-center mb-3">
                <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px; object-fit: cover;">
                <span>${item.title}</span>
                <div class="input-group input-group-sm">
                    <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <input type="text" class="form-control text-center" value="${item.quantity}" readonly>
                    <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <span>$${(item.quantity * item.price).toFixed(2)}</span>
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">&times;</button>
            </div>
        `;
    });

    cartTotal.textContent = totalPrice.toFixed(2);
    cartModal.show();
}

// Update Quantity
function updateQuantity(productId, delta) {
    const item = cart.find((i) => i.id === productId);

    if (!item) return;

    item.quantity += delta;

    if (item.quantity <= 0) {
        removeFromCart(productId);
    }

    updateCartUI();
    viewCart();
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);

    updateCartUI();
    viewCart();
}

// Clear Cart
function clearCart() {
    cart = [];
    updateCartUI();
    viewCart();
}

// Checkout Process
function checkout() {
    if (cart.length === 0) return alert("Cart is empty!");

    let receipt = "Checkout Summary:\n\n";

    cart.forEach((item) => {
        receipt += `${item.title} (x${item.quantity}): $${(item.quantity * item.price).toFixed(2)}\n`;
    });

    const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
    receipt += `\nTotal: $${total.toFixed(2)}`;

    alert(receipt);
    clearCart();
}

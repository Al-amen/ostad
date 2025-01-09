document.addEventListener("DOMContentLoaded", loadProducts);

function loadProducts() {
    fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((products) => displayProducts(products))
        .catch((err) => console.error("Error fetching products:", err));
}

function displayProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach((product) => {
        const productCard = `
            <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.title}" style="height: 200px; object-fit: contain;">

                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.description.slice(0, 80)}...</p>
                        <p class="card-text"><strong>Price: $${product.price.toFixed(2)}</strong></p>
                        <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
        productList.insertAdjacentHTML("beforeend", productCard);
    });

    window.products = products; // Cache products
}

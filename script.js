// PRODUCT DATA
const products = [
    { id: 1, name: "Chopper Figure", price: 500, image: "chopper.jpg" },
    { id: 2, name: "Luffy Shirt", price: 700, image: "luffy.jpg" },
    { id: 3, name: "Sanji Mug", price: 300, image: "sanji.jpg" },
    { id: 4, name: "Zoro Poster", price: 400, image: "zoro.jpg" },
    { id: 5, name: "Usopp Slingshot", price: 600, image: "usopp.jpg" },
    { id: 6, name: "Nami Wallet", price: 800, image: "nami.jpg" },
    { id: 7, name: "Robin Book", price: 500, image: "robin.jpg" },
    { id: 8, name: "Franky Arm", price: 1000, image: "franky.jpg" },
    { id: 9, name: "Brook Guitar", price: 900, image: "brook.jpg" },
    { id: 10, name: "Jinbe Figurine", price: 1100, image: "jimbe.jpg" }
];

let cart = []; // Shopping cart array

// ELEMENTS
const productsContainer = document.getElementById("products");
const cartContainer = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");

// LOAD PRODUCTS TO PAGE
function loadProducts() {
    productsContainer.innerHTML = "";
    products.forEach((product) => {
        const productEl = document.createElement("div");
        productEl.classList.add("product");
        productEl.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₱${product.price}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        productsContainer.appendChild(productEl);
    });

    // Add event listeners to buttons
    document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", addToCart);
    });
}

// ADD TO CART FUNCTION
function addToCart(event) {
    const productId = parseInt(event.target.dataset.id);
    const product = products.find((p) => p.id === productId);
    const cartItem = cart.find((item) => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// UPDATE CART DISPLAY
function updateCart() {
    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
        total += item.price * item.quantity;
        const cartItemEl = document.createElement("li");
        cartItemEl.innerHTML = `
            <span>${item.name} (₱${item.price}) x ${item.quantity}</span>
            <button class="remove-btn" data-id="${item.id}">🗑</button>
        `;
        cartContainer.appendChild(cartItemEl);
    });

    totalPriceEl.textContent = total.toFixed(2);

    document.querySelectorAll(".remove-btn").forEach((button) => {
        button.addEventListener("click", removeFromCart);
    });
}

// REMOVE ITEM FUNCTION
function removeFromCart(event) {
    const productId = parseInt(event.target.dataset.id);
    cart = cart.filter((item) => item.id !== productId);
    updateCart();
}

// INITIAL LOAD
loadProducts();

const productsDiv = document.getElementById("products");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

let allProducts = [];

/* STEP 1: FETCH PRODUCTS */
async function fetchProducts() {
  const res = await fetch("https://dummyjson.com/products?limit=12");
  const data = await res.json();
  allProducts = data.products;

  renderProducts(allProducts);
  populateCategories(allProducts);
}
fetchProducts();

/* STEP 2: RENDER PRODUCTS */
function renderProducts(products) {
  productsDiv.innerHTML = "";

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${p.thumbnail}" />
      <h3>${p.title}</h3>
      <p>₹${p.price}</p>
      <button onclick='addToCart(${JSON.stringify(p)})'>Add to Cart</button>
    `;

    productsDiv.appendChild(card);
  });
}

/* STEP 3: POPULATE CATEGORIES */
function populateCategories(products) {
  const categories = new Set(products.map(p => p.category));
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categoryFilter.appendChild(opt);
  });
}

/* STEP 4: FILTER PRODUCTS */
function filterProducts() {
  const search = searchInput.value.toLowerCase();
  const category = categoryFilter.value;

  const filtered = allProducts.filter(p =>
    p.title.toLowerCase().includes(search) &&
    (category === "all" || p.category === category)
  );

  renderProducts(filtered);
}

searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);

/* STEP 5: ADD TO CART (FIXED) */
function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

/* STEP 6: RENDER CART (FIXED) */
function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty</p>";
    cartTotal.textContent = "₹0";
    return;
  }

  cart.forEach(item => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <div>
        <strong>${item.title}</strong>
        <div class="qty">Qty: ${item.quantity}</div>
      </div>
      <button onclick="removeOne(${item.id})">❌</button>
    `;

    cartItems.appendChild(div);
  });

  cartTotal.textContent = `₹${total}`;
}

/* STEP 7: REMOVE ONE QUANTITY (KEY FIX) */
function removeOne(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const item = cart.find(p => p.id === id);

  if (!item) return;

  if (item.quantity > 1) {
    item.quantity -= 1;
  } else {
    cart = cart.filter(p => p.id !== id);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

/* STEP 8: CART MODAL */
document.getElementById("openCart").onclick = () => {
  cartModal.classList.remove("hidden");
  renderCart();
};

document.getElementById("closeCart").onclick = () => {
  cartModal.classList.add("hidden");
};

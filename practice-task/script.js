// async function fetchProducts() {
//   const response = await fetch("https://dummyjson.com/products");
//   const data = await response.json();

//   console.log("Products:", data.products);
//   console.log("Total products:", data.total);
//   console.log("First product:", data.products[0].title);
// }

// fetchProducts();

// ----------------------------------------------------------------

// const productList = document.getElementById("productList");

// async function loadProducts() {
//   const res = await fetch("https://dummyjson.com/products");
//   const data = await res.json();

//   productList.innerHTML = "";

//   data.products.forEach(p => {
//     const div = document.createElement("div");
//     div.className = "product";

//     div.innerHTML = `
//       <h3>${p.title}</h3>
//       <p>Price: ₹${p.price}</p>
//     `;

//     productList.appendChild(div);
//   });
// }

// loadProducts();

// -------------------------------------------------------------------

// const loading = document.getElementById("loading");

// async function loadProducts() {
//   loading.style.display = "block";

//   await new Promise((resolve) => setTimeout(resolve, 2000));

//   const res = await fetch("https://dummyjson.com/products");
//   const data = await res.json();

//   loading.style.display = "none";

//   data.products.forEach((p) => {
//     const div = document.createElement("div");
//     div.className = "product";
//     div.textContent = p.title;
//     productList.appendChild(div);
//   });
// }

// loadProducts();

// --------------------------------------------------------------------

// const errorEl = document.querySelector("#error");

// async function loadProducts() {
//   try {
//     loading.style.display = "block";

//     const res = await fetch("https://dummyjson.com/products123"); //wrong url
//     if (!res.ok) {
//       throw new Error("Failed to fetch products");
//     }

//     const data = await res.json();
//     loading.style.display = "none";

//     console.log(data);
//   } catch (err) {
//     loading.style.display = "none";
//     errorEl.textContent = "❌ Unable to load products";
//   }
// }

// loadProducts();

// ------------------------------------------------------------

// const productList = document.getElementById("productList");

// async function fetchSingle() {
//   const res = await fetch("https://dummyjson.com/products/1");
//   const product = await res.json();

//   productList.innerHTML = `
//     <div class="product">
//       <h3>${product.title}</h3>
//       <p>₹${product.price}</p>
//     </div>
//   `;
// }

// fetchSingle();

// ----------------------------------------------------------------

// async function createProduct() {
//   const res = await fetch("https://dummyjson.com/products/add", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       title: "Practice Shoes",
//       price: 2999,
//     }),
//   });

//   const data = await res.json();
//   console.log("Created Data:", data);
// }

// createProduct();

// ----------------------------------------------------------------

async function deleteProduct() {
  const res = await fetch("https://dummyjson.com/products/1", {
    method: "DELETE",
  });

  const data = await res.json();
  console.log("Deleted:", data);
}

deleteProduct();

const products = [
  { id: 1, name: "Ferrari Racer", brand: "HotWheels", price: 10, image: "ferrari.jpg" },
  { id: 2, name: "BMW", brand: "Matchbox", price: 12, image: "bmwww.jpg" },
  { id: 3, name: "Bugatti vintage", brand: "HotWheels", price: 18, image: "bug.webp" },
  { id: 4, name: "mClaren Racer", brand: "Matchbox", price: 15, image: "mc.webp" },
  { id: 5, name: "Ford Racer", brand: "HotWheels", price: 13, image: "fd.webp" },
  { id: 6, name: "mClaren F1", brand: "Matchbox", price: 25, image: "mcf1.webp" },
  { id: 7, name: "Chevrolet", brand: "HotWheels", price: 12, image: "chev.jpg" },
  { id: 8, name: "BMW Vintage", brand: "Matchbox", price: 11, image: "bmw2.webp" },
  { id: 9, name: "Bentely vintage", brand: "HotWheels", price: 28, image: "ben.jpeg" },
  { id: 10, name: "Mini Cooper USA", brand: "Matchbox", price: 25, image: "Mini.jpg" }
];

let cart = [];

// Display Products
function displayProducts(productList) {
  const shop = document.getElementById("shop");
  shop.innerHTML = "";

  productList.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" style="width: 100%; max-height: 150px; object-fit: contain;" />
      <h4>${product.name}</h4>
      <p>${product.brand}</p>
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    shop.appendChild(card);
  });
}

// Add to Cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push(product);
    updateCart();
  }
}

// Remove from Cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Update Cart Display
function updateCart() {
  const cartList = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price}
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartList.appendChild(li);
    total += item.price;
  });

  cartTotal.textContent = total.toFixed(2);
}

// Apply Filters and Sorting
function applyFiltersAndSorting() {
  const selectedBrand = document.getElementById("filter-brand").value;
  const sortOption = document.getElementById("sort-price").value;

  let filtered = selectedBrand === "all"
    ? [...products]
    : products.filter(p => p.brand.toLowerCase() === selectedBrand.toLowerCase());

  if (sortOption === "low-high") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOption === "high-low") {
    filtered.sort((a, b) => b.price - a.price);
  }

  displayProducts(filtered);
}

// 🔄 Add animation to nav links (Shop, Cart, About) on click
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");
    if (targetId.startsWith("#")) {
      e.preventDefault();
      const section = document.querySelector(targetId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });

        // Add temporary animation class
        section.classList.add("section-animate");
        setTimeout(() => {
          section.classList.remove("section-animate");
        }, 800);
      }
    }

    // Animate the nav link itself
    link.classList.add("animate");
    setTimeout(() => {
      link.classList.remove("animate");
    }, 500);
  });
});

// Initial Load
displayProducts(products);
document.getElementById("filter-brand").addEventListener("change", applyFiltersAndSorting);
document.getElementById("sort-price").addEventListener("change", applyFiltersAndSorting);

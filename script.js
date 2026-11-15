
let selectedCategory = "All";
let cart = [];
let wishlist = [];

function money(value) {
  return "৳" + Number(value).toLocaleString("en-IN");
}

function getProducts() {
  return window.products || [];
}

// DISPLAY PRODUCTS

function renderProducts() {
  const searchInput = document.getElementById("search");
  const list = document.getElementById("product-list");

  if (!searchInput || !list) return;

  const search = searchInput.value.toLowerCase().trim();

  const filtered = getProducts().filter(p => {
    const categoryMatch =
      selectedCategory === "All" ||
      p.category === selectedCategory;

    const searchMatch =
      p.name.toLowerCase().includes(search) ||
      p.category.toLowerCase().includes(search);

    return categoryMatch && searchMatch;
  });

  if (!filtered.length) {
    list.innerHTML = '<div class="empty">No products found.</div>';
    return;
  }

  list.innerHTML = filtered.map(p => `
    <article class="product">
      <img src="${p.image}" alt="${p.name}" loading="lazy"
        onerror="this.src='https://placehold.co/600x600/151515/D7B56D?text=AURUM'">

      <div class="product-info">
        <div class="category-label">${p.category}</div>
        <h3>${p.name}</h3>
        <div class="price">${money(p.price)}</div>

        <div class="product-actions">
          <button class="add-btn" onclick="addToCart(${p.id})">
            ADD TO CART
          </button>

          <button class="wish-btn ${wishlist.includes(p.id) ? "liked" : ""}"
            onclick="toggleWish(${p.id})">
            ♥
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

// CATEGORY FILTER

function filterProducts(category, button) {
  selectedCategory = category;

  document.querySelectorAll(".filter").forEach(b => {
    b.classList.remove("active");
  });

  if (button) button.classList.add("active");

  renderProducts();
}

// ADD TO CART

function addToCart(id) {
  const product = getProducts().find(p => p.id === id);
  if (!product) return;

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id: id, qty: 1 });
  }

  updateCart();
}

// WISHLIST

function toggleWish(id) {
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(x => x !== id);
  } else {
    wishlist.push(id);
  }

  renderProducts();
}

// UPDATE CART

function updateCart() {
  const countElement = document.getElementById("cart-count");
  const container = document.getElementById("cart-items");
  const totalElement = document.getElementById("cart-total");

  const products = getProducts();

  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  if (countElement) countElement.textContent = count;

  if (container) {
    if (!cart.length) {
      container.innerHTML =
        '<p style="color:#aaa">Your cart is empty.</p>';
    } else {
      container.innerHTML = cart.map(item => {
        const p = products.find(x => x.id === item.id);
        if (!p) return "";

        return `
          <div class="cart-item">
            <img src="${p.image}" alt="${p.name}">

            <div class="cart-item-info">
              <strong>${p.name}</strong>
              <p>${money(p.price)}</p>

              <div class="qty-row">
                <button onclick="changeQty(${p.id},-1)">−</button>
                <span>${item.qty}</span>
                <button onclick="changeQty(${p.id},1)">+</button>
                <button class="remove" onclick="removeItem(${p.id})">
                  Remove
                </button>
              </div>
            </div>
          </div>
        `;
      }).join("");
    }
  }

  const total = cart.reduce((sum, item) => {
    const p = products.find(x => x.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);

  if (totalElement) totalElement.textContent = money(total);

  const message = document.getElementById("checkout-message");
  if (message) message.textContent = "";
}

// CHANGE QUANTITY

function changeQty(id, change) {
  const item = cart.find(x => x.id === id);
  if (!item) return;

  item.qty += change;

  if (item.qty <= 0) {
    removeItem(id);
  } else {
    updateCart();
  }
}

// REMOVE ITEM

function removeItem(id) {
  cart = cart.filter(x => x.id !== id);
  updateCart();
}

// OPEN CART

function openCart() {
  document.getElementById("cart-panel")?.classList.add("open");
  document.getElementById("overlay")?.classList.add("show");
}

// CLOSE CART

function closeCart() {
  document.getElementById("cart-panel")?.classList.remove("open");
  document.getElementById("overlay")?.classList.remove("show");
}

// CHECKOUT

function checkout() {
  const message = document.getElementById("checkout-message");
  if (!message) return;

  if (!cart.length) {
    message.textContent = "Your cart is empty. Add a product first.";
    return;
  }

  const total = cart.reduce((sum, item) => {
    const p = getProducts().find(x => x.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);

  message.textContent =
    "Demo checkout only. Your order total is " + money(total) +
    ". Real payment is not connected yet.";
}

// INITIALIZE

document.addEventListener("DOMContentLoaded", function() {
  renderProducts();
  updateCart();
});

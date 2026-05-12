// Mariam

const myNavbar = `
    <nav>
      <ul>
        <li>
          <a href="index.html">Home</a>
        </li>
        <li class="drop">
          <a href="generalcat.html">Category</a>
          <ul class="drop-content">
            <li>
              <a href="dresses.html">Dresses</a>
            </li>
            <li>
              <a href="accessories.html">Accessories</a>
            </li>
            <li>
              <a href="New Text Document.html">makeup</a>
            </li>
            <li>
              <a href="shoes.html">Shoes & Bags</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="cart.html">Basket</a>
        </li>
        <li>
          <a href="contactus.html">Contact</a>
        </li>
        </li>
        <li style="position: relative; margin-left: auto;">
          <a href="cart.html" style="font-size: 24px; padding: 5px 15px;">
            🛍️
            <span class="num-cart" style="position: absolute; top: 0px; right: 0px; width: 18px; height: 18px; font-size: 10px;"></span>     
          </a>
        </li>
      </ul>
      
    </nav>
`;

document.addEventListener("DOMContentLoaded", function () {
  const navPlaceholder = document.getElementById("navbar-placeholder");
  if (navPlaceholder) {
    navPlaceholder.innerHTML = myNavbar;
  }
  updateCounter(); 
});

function addToCart(event) {
  const card =
    event.target.closest(".product") || event.target.closest(".best-item");
  if (!card) return;

  let titleEl =
    card.querySelector(".title") || card.querySelector("p:first-of-type");
  let priceEl =
    card.querySelector(".price") || card.querySelector("p:nth-of-type(2)");

  const title = titleEl ? titleEl.innerText : "Product";
  const price = priceEl ? priceEl.innerText : "$0.00";
  const img = card.querySelector("img").getAttribute("src");

  let cart = JSON.parse(localStorage.getItem("basket")) || [];

  const exist = cart.find((item) => item.title === title);
  if (exist) {
    exist.quantity += 1;
  } else {
    cart.push({ title, price, img, quantity: 1 });
  }

  localStorage.setItem("basket", JSON.stringify(cart));
  updateCounter();

  if (
    confirm(
      "Item added! Do you want to go to the cart now? \n(Click OK for Cart, Cancel to keep shopping)",
    )
  ) {
    window.location.href = "cart.html";
  }
}

function updateCounter() {
  let cart = JSON.parse(localStorage.getItem("basket")) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badges = document.querySelectorAll(".num-cart"); 
  
  badges.forEach((badge) => {
    if (count > 0) {
      badge.innerText = count;
      badge.style.visibility = "visible";
    } else {
      badge.style.visibility = "hidden";
    }
  });
}

function buildCart() {
  const container = document.querySelector(".cart-cont");
  if (!container) return; 
  
  let cart = JSON.parse(localStorage.getItem("basket")) || [];
  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const priceNum = parseFloat(item.price.replace("$", ""));
    total += priceNum * item.quantity;

    container.innerHTML += `
     <div class="cart-box">
          <img src="${item.img}" class="cart-img" style="width: 100px; border-radius: 8px;" />
          <div class="cart-det">
            <h3 class="cart-title">${item.title}</h3>
            <p class="cart-pri">${item.price}</p>
            <div class="count">
              <button onclick="updateQty(${index}, 1)">+</button>
              <span class="number">${item.quantity}</span>
              <button onclick="updateQty(${index}, -1)">-</button>
            </div>
          </div>
          <button style="background: red; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer;" onclick="deleteItem(${index})">X</button>
        </div>
    `;
  });

  if (cart.length > 0) {
    container.innerHTML += `
      <div class="total-sum">
          <div class="total-text">Total :</div>
          <div class="total-cal">$${total.toFixed(2)}</div>
      </div>
      <button class="buy-now" onclick="window.location.href='CheckOut.html'">Buy Now</button>
    `;
  } else {
    container.innerHTML = "<h3>Your cart is empty!</h3>";
  }
}

function updateQty(index, change) {
  let cart = JSON.parse(localStorage.getItem("basket"));
  if (cart[index].quantity + change >= 1) {
    cart[index].quantity += change;
    localStorage.setItem("basket", JSON.stringify(cart));
    buildCart();
    updateCounter();
  }
}

function deleteItem(index) {
  let cart = JSON.parse(localStorage.getItem("basket")) || [];
  cart.splice(index, 1);
  localStorage.setItem("basket", JSON.stringify(cart));
  updateCounter();
  buildCart();
}

function filter(category) {
  let search = document.querySelectorAll(".product");
  search.forEach((product) => {
    if (category === "all") {
      product.style.display = "flex";
    } else {
      if (product.classList.contains(category)) {
        product.style.display = "flex";
      } else {
        product.style.display = "none";
      }
    }
  });
}

function validateCheckout(event) {
  event.preventDefault();

  let isValid = true;
  const inputs = document.querySelectorAll(
    "#main-checkout-form input[required]",
  );

  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      input.style.border = "2px solid red";
      isValid = false;
    } else {
      input.style.border = "1px solid #ccc";
    }
  });

  if (isValid) {
    alert(
      "Order placed successfully! Thank you for shopping with Lady Boutique.",
    );
    localStorage.removeItem("basket");
    window.location.href = "index.html";
  } else {
    alert("Please fill in all required fields marked in red.");
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

window.onload = function () {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
  if (document.querySelector(".cart-cont")) {
    buildCart();
  }
  updateCounter();
};

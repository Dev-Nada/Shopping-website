function addToCart(event) {
  alert("Added to cart");
  const card = event.target.closest(".product");
  const title = card.querySelector(".title").innerText;
  const price = card.querySelector(".price").innerText;
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
}

function filter(category) {
  let search = document.querySelectorAll(".product");

  search.forEach((product) => {
    if (category === "all") {
      product.style.display = "block";
    } else {
      if (product.classList.contains(category)) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    }
  });
}

function updateCounter() {
  let cart = JSON.parse(localStorage.getItem("basket")) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.querySelector(".num-cart");
  if (badge) { 
    if (count > 0) {
      badge.innerText = count;
      badge.style.visibility = "visible";
    } else {
      badge.style.visibility = "hidden";
    }
  }
}

updateCounter();

function buildCart() {
  const container = document.querySelector(".cart-cont");
  let cart = JSON.parse(localStorage.getItem("basket")) || [];
  container.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    const priceNum = parseFloat(item.price.replace("$", ""));
    total += priceNum * item.quantity;
    container.innerHTML += `
     <div class="cart-box">
          <img src="${item.img}" class="cart-img" />

          <div class="cart-det">
            <h3 class="cart-title">${item.title}</h3>
            <p class="cart-pri">${item.price}</p>

            <div class="count">
              <button id="increas" onclick="updateQty(${index}, 1)" >+</button>
              <span class="number">${item.quantity}</span>
              <button id="decreasa" onclick="updateQty(${index}, -1)">-</button>
            </div>
          </div>
          <img class="cart-delete cart-rem" src="images/delete.png" onclick="deleteItem(${index})" />
        </div>
    `;
  });
  if (cart.length > 0) {
    container.innerHTML += `
      <div class="total-sum">
          <div class="total-text">Total :</div>
          <div class="total-cal">$${total.toFixed(2)}</div>
      </div>
      <button class="buy-now">Buy Now</button>
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
  }
}

function deleteItem(index) {
  let cart = JSON.parse(localStorage.getItem("basket")) || [];
  if (index < 0 || index >= cart.length) return;
  cart.splice(index, 1);
  localStorage.setItem("basket", JSON.stringify(cart));
  updateCounter();
  buildCart();
}
if (document.querySelector('.cart-cont')) {
  buildCart();
}

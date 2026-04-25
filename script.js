function addToCart() {
  alert("Added to cart!");
}

function filterProducts(category) {
  let products = document.querySelectorAll(".product");

  products.forEach(product => {
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
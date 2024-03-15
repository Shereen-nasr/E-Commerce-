import products from "./products.js";

// const menu = document.querySelector(".navigation");
const searchButton = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-input");
const productsContainer = document.querySelector(".product-list");
const mainSectionContent = document.querySelector(".product-display");

const cartIcon = document.querySelector(".cart-icon");
const cartContainer = document.querySelector(".cart-container");
const closeCartBtn = document.getElementById("close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartItemsContainer = document.querySelector(".cart-items");

let cart = [];

function renderProduct(product) {
  const productHtml = `
          <div class="product">
              <img class="product-img" src=${product.img} alt="Product 1" />
              <h3>${product.name}</h3>
              <span class="price">$${product.price}</span>
              <button class="add-to-cart">Add to Cart</button>
        </div>
`;
  productsContainer.insertAdjacentHTML("beforeend", productHtml);
}

function searchProducts() {
  productsContainer.innerHTML = "";
  const searchQuery = searchInput.value.trim().toLowerCase();

  if (!searchQuery) {
    products.forEach((product) => {
      renderProduct(product);
    });
  } else {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery)
    );

    if (filteredProducts.length === 0) {
      mainSectionContent.innerHTML = "";
      renderNoResultsMessage();
    } else {
      filteredProducts.forEach((product) => {
        renderProduct(product);
      });
    }
  }
}

function renderNoResultsMessage() {
  const messageHtml = `
      <div class="no-result">
              <img class="no-result-img" src="./images/no_result.gif" alt="Product 1" />
        </div>
  `;
  mainSectionContent.insertAdjacentHTML("beforeend", messageHtml);
}

const showProducts = () => {
  products.forEach((product) => {
    renderProduct(product);
  });
};

showProducts();

function addToCart(event) {
  const product = event.target.closest(".product");

  const productName = product.querySelector("h3").innerText;
  const productPrice = parseFloat(
    product.querySelector("span").innerText.replace("$", "")
  );
  const productImage = product.querySelector("img").getAttribute("src");

  const existingItem = cart.find((item) => item.name === productName);

  if (existingItem) {
    existingItem.quantity++;
    existingItem.price += productPrice;
  } else {
    cart.push({
      name: productName,
      img: productImage,
      price: productPrice,
      quantity: 1,
    });
  }

  cartItemsContainer.innerHTML = "";

  cart.forEach((item) => {
    const cartHtml = `<div class="cart-item">
                          <img class="cart-img" src="${
                            item.img
                          }" alt="Product Image">
                          <div class="item-details">
                              <h3>${item.name}</h3>
                              <p>Price: ${item.price.toFixed(2)}</p>
                              <p>Quantity: ${item.quantity}</p>
                          </div>
                      </div>`;
    cartItemsContainer.insertAdjacentHTML("beforeend", cartHtml);
  });
}

searchButton.addEventListener("click", () => {
  searchProducts();
});
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchProducts();
  }
});

cartIcon.addEventListener("click", function (e) {
  e.preventDefault();
  cartContainer.classList.toggle("open");
});

closeCartBtn.addEventListener("click", function () {
  cartContainer.classList.remove("open");
});

clearCartBtn.addEventListener("click", () => {
  cart = [];
  cartItemsContainer.innerHTML = "";
});

productsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart")) {
    addToCart(event);
  }
});

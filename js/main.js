const shop = document.getElementById("shop");
const shoppingCart = document.getElementById("shopping-cart");
const btnCatagorys = document.querySelectorAll(".btnCatagorys");
let cartAmount = document.querySelector(".cartAmount");
let basket = JSON.parse(localStorage.getItem("data")) || [];

// cart arr
let cart = [];
// Produktdatat finns i variabeln shopData (se data.js)

const generateShop = () => {
  //Generera alla produkter med dynamisk HTML och Array.protype.map() samt join()
  // Använd denna markup för varje produktkort - den korresponderar mot CSS:en
  shop.innerHTML = "";

  shopData
    .map((item) => {
      shop.innerHTML += `
          <div id="product-id-${item.id}" class="item">
           <img width="220" src="${item.image}" alt="">
            <div class="details">
              <h3>${item.title}</h3>
              <p>${item.description}</p>
              <div class="price-quantity">
                <h2>${item.price}$</h2>
                <div class="unit">
                  <div class="addToCart" onclick="addToCart(${item.id})"></div>
                </div>
              </div>
            </div>
          </div>`;
    })
    .join("");
};
generateShop();
const quantity = document.querySelectorAll(".quantity");

function addToCart(id) {
  // check if item already exist in cart, tell the customer that the item is already in the cart.
  if (cart.some((item) => item.id === id)) {
    alert("Product is already in Cart");
  } else {
    // find current item with same id.
    const item = shopData.find((product) => product.id === id);
    cartAmount.innerHTML++;
    // destruct and save all the old properties and add a new property.
    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }
  setLocalStorage();
}
function setLocalStorage() {
  localStorage.setItem("data", JSON.stringify(cart));
}

btnCatagorys.forEach((btn) => {
  btn.addEventListener("click", () => {
    const items = btn.getAttribute("data-category");
    shop.innerHTML = "";
    filterItems(items).map((item) => {
      shop.innerHTML += `
      <div id="product-id-${item.id}" class="item">
           <img width="220" src="${item.image}" alt="">
            <div class="details">
              <h3>${item.title}</h3>
              <p>${item.description}</p>
              <div class="price-quantity">
                <h2>${item.price}$</h2>
                <div class="unit">
                  <div class="addToCart" onclick="addToCart(${item.id})"></div>
                </div>
              </div>
            </div>
          </div>
      `;
    });
  });
});

// const categoris = shopData.map((items) => {
//   return items.category;
// });

function filterItems(category) {
  return shopData.filter((item) => item.category === category);
}

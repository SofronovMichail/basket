var d = document,
  itemBox = d.querySelectorAll(".item_box"),
  cartCont = d.getElementById("cart_content");
function addEvent(elem, type, handler) {
  if (elem.addEventListener) {
    elem.addEventListener(type, handler, false);
  } else {
    elem.attachEvent("on" + type, function () {
      handler.call(elem);
    });
  }
  return false;
}
// Получаем данные из LocalStorage
function getCartData() {
  return JSON.parse(localStorage.getItem("cart"));
}
// Записываем данные в LocalStorage
function setCartData(date) {
  localStorage.setItem("cart", JSON.stringify(date));
  return false;
}
var totalCost = 0;
var totalCountItems = 0;
// Добавляем товар в корзину
function addToCart() {
  this.disabled = true;
  var cartData = getCartData() || {},
    parentBox = this.parentNode,
    itemId = this.getAttribute("data-id"),
    itemTitle = parentBox.querySelector(".item_title").innerHTML,
    itemPrice = parentBox.querySelector(".item_price").innerHTML,
    itemTotalCost = itemPrice;
  if (cartData.hasOwnProperty(itemId)) {
    cartData[itemId][2] += 1;
    cartData[itemId][3] = cartData[itemId][2] * itemPrice;
    totalCost += Number(itemPrice);
  } else {
    cartData[itemId] = [itemTitle, itemPrice, 1, itemTotalCost];
    totalCost += Number(itemPrice);
  }
  totalCountItems++;

  if (!setCartData(cartData)) {
    this.disabled = false;
    cartCont.innerHTML = "Товар добавлен в корзину.";
    setTimeout(function () {
      cartCont.innerHTML = "Продолжить покупки...";
    }, 1000);
  }
  return false;
}

for (var i = 0; i < itemBox.length; i++) {
  addEvent(itemBox[i].querySelector(".add_item"), "click", addToCart);
}

function openBasket() {
  window.location.href = "basket.html";
}

addEvent(d.getElementById("checkout"), "click", openBasket);
addEvent(d.getElementById("clear_cart"), "click", function () {
  totalCost = 0;
  totalCountItems = 0;
  localStorage.removeItem("cart");
  cartCont.innerHTML = "Корзина очишена.";
});

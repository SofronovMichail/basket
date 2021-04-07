function openCart() {
  var cartData = getCartData(),
    totalItems = "";
  console.log(JSON.stringify(cartData));
  if (cartData !== null) {
    totalItems =
      '<table class="shopping_list"><tr><th>Наименование</th><th>Цена</th><th>Кол-во</th><th>Итого</th></th></tr>';
    for (var items in cartData) {
      totalItems += "<tr>";
      for (var i = 0; i < cartData[items].length; i++) {
        totalItems += "<td>" + cartData[items][i] + "</td>";
      }
      totalItems += "</tr>";
    }

    totalItems += "<table>";
    cartCont.innerHTML = totalItems;
  } else {
    // если в корзине пусто, то сигнализируем об этом
    cartCont.innerHTML = "В корзине пусто!";
  }
  return false;
}
openCart();

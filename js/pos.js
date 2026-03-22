let products = getData('products');
let cart = [];

function renderProducts() {
  const container = document.getElementById('products');
  container.innerHTML = '';

  products.forEach((p, i) => {
    const div = document.createElement('div');
    div.innerHTML = `
      ${p.name} - ${p.price}
      <button onclick="addToCart(${i})">إضافة</button>
    `;
    container.appendChild(div);
  });
}

function addToCart(i) {
  cart.push(products[i]);
  renderCart();
}

function renderCart() {
  const list = document.getElementById('cart');
  list.innerHTML = '';

  let total = 0;

  cart.forEach((item, i) => {
    total += item.price;

    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} - ${item.price}
      <button onclick="removeFromCart(${i})">حذف</button>
    `;
    list.appendChild(li);
  });

  document.getElementById('total').innerText = "الإجمالي: " + total;
}

function removeFromCart(i) {
  cart.splice(i, 1);
  renderCart();
}

function checkout() {
  alert("تمت العملية");
  cart = [];
  renderCart();
}

renderProducts();

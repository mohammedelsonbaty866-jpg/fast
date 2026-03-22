let cart = [];

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  renderCart();
}

function renderCart() {
  const list = document.getElementById('cart');
  if (!list) return;

  list.innerHTML = '';
  let total = 0;

  cart.forEach((item, i) => {
    total += item.price;

    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} - ${item.price}
      <button onclick="removeFromCart(${i})">X</button>
    `;
    list.appendChild(li);
  });

  document.getElementById('total').innerText = total;
}

function removeFromCart(i) {
  cart.splice(i, 1);
  renderCart();
}

function checkout() {
  alert("Done!");
  cart = [];
  renderCart();
}

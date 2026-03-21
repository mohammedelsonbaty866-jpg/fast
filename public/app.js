const API = '';

let cart = [];

async function loadProducts() {
  const res = await fetch(API + '/products');
  const data = await res.json();

  const container = document.getElementById('products');
  container.innerHTML = '';

  data.forEach(p => {
    const div = document.createElement('div');
    div.innerHTML = `
      <b>${p.name}</b> - ${p.price}
      <button onclick="addToCart(${p.id}, '${p.name}', ${p.price})">Add</button>
    `;
    container.appendChild(div);
  });
}

function addToCart(id, name, price) {
  cart.push({ id, name, price });
  renderCart();
}

function renderCart() {
  const list = document.getElementById('cart');
  list.innerHTML = '';

  let total = 0;

  cart.forEach(item => {
    total += item.price;

    const li = document.createElement('li');
    li.innerText = `${item.name} - ${item.price}`;
    list.appendChild(li);
  });

  document.getElementById('total').innerText = 'Total: ' + total;
}

function checkout() {
  alert('Sale completed!');
  cart = [];
  renderCart();
}

loadProducts();

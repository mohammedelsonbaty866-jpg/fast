const API = 'http://localhost:3000';

async function loadProducts() {
  const res = await fetch(API + '/products');
  const data = await res.json();

  const list = document.getElementById('products');
  list.innerHTML = '';

  data.forEach(p => {
    const li = document.createElement('li');
    li.innerText = `${p.name} - ${p.price} - ${p.quantity}`;
    list.appendChild(li);
  });
}

async function addProduct() {
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const quantity = document.getElementById('quantity').value;

  await fetch(API + '/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, price, quantity })
  });

  loadProducts();
}

loadProducts();

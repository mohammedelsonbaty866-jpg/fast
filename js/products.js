let products = [
  { id: 1, name: "Coffee", price: 50 },
  { id: 2, name: "Tea", price: 30 }
];

function renderProducts() {
  const container = document.getElementById('products');
  if (!container) return;

  container.innerHTML = '';

  products.forEach(p => {
    const div = document.createElement('div');
    div.innerHTML = `
      ${p.name} - ${p.price}
      <button onclick="addToCart(${p.id})">Add</button>
    `;
    container.appendChild(div);
  });
}

function addProduct() {
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;

  products.push({
    id: products.length + 1,
    name,
    price: Number(price)
  });

  alert("Added!");
}

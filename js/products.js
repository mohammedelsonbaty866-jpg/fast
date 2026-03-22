let products = getData('products');

function renderProducts() {
  const list = document.getElementById('productList');
  if (!list) return;

  list.innerHTML = '';

  products.forEach((p, i) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${p.name} - ${p.price}
      <button onclick="deleteProduct(${i})">حذف</button>
    `;
    list.appendChild(li);
  });
}

function addProduct() {
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;

  if (!name || !price) return;

  products.push({ name, price: Number(price) });
  saveData('products', products);
  renderProducts();
}

function deleteProduct(i) {
  products.splice(i, 1);
  saveData('products', products);
  renderProducts();
}

window.onload = renderProducts;

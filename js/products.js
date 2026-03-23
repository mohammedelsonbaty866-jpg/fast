let products = getData('products');
let filtered = [...products];

// عرض
function render() {
  let list = document.getElementById('productList');
  list.innerHTML = '';

  filtered.forEach((p, i) => {
    list.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${p.price}</td>
        <td>${p.box || '-'}</td>
        <td>${p.carton || '-'}</td>
        <td>${p.min}</td>
        <td>${p.max}</td>
        <td><button onclick="del(${i})">X</button></td>
      </tr>
    `;
  });
}

// إضافة
function addProduct() {
  let p = {
    name: name.value,
    price: Number(price.value),
    box: Number(box.value) || null,
    carton: Number(carton.value) || null,
    min: Number(min.value) || 0,
    max: Number(max.value) || 999999
  };

  if (!p.name || !p.price) return alert("بيانات ناقصة");

  products.push(p);
  saveData('products', products);

  filtered = [...products];
  render();
}

// حذف
function del(i) {
  let realIndex = products.indexOf(filtered[i]);
  products.splice(realIndex, 1);

  saveData('products', products);

  filtered = [...products];
  render();
}

// بحث
function searchProducts() {
  let v = search.value.toLowerCase();

  filtered = products.filter(p =>
    p.name.toLowerCase().includes(v)
  );

  render();
}

render();

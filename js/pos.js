let products = getData('products');
let filteredProducts = [...products];
let cart = [];

let customer = {
  name: "نقدي",
  balance: 0
};

// عرض المنتجات
function renderProducts() {
  const container = document.getElementById('products');
  container.innerHTML = '';

  filteredProducts.forEach((p, i) => {
    const div = document.createElement('div');

    div.innerHTML = `
      ${p.name}
      <select onchange="setUnit(${i}, this.value)">
        <option value="unit">وحدة (${p.price})</option>
        <option value="box">علبة (${p.box || p.price})</option>
        <option value="carton">كرتونة (${p.carton || p.price})</option>
      </select>

      <button onclick="addToCart(${i})">إضافة</button>
    `;

    container.appendChild(div);
  });
}

// بحث
function searchProducts() {
  const v = document.getElementById('search').value.toLowerCase();

  filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(v)
  );

  renderProducts();
}

// إضافة
function addToCart(i) {
  let p = filteredProducts[i];

  cart.push({
    name: p.name,
    price: p.price,
    qty: 1,
    min: p.min || p.price,
    max: p.max || p.price * 2
  });

  renderCart();
}

// عرض السلة
function renderCart() {
  const tbody = document.getElementById('cart');
  tbody.innerHTML = '';

  let total = 0;

  cart.forEach((item, i) => {
    let sub = item.price * item.qty;
    total += sub;

    let tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${item.name}</td>

      <td>وحدة</td>

      <td>
        <input type="number" value="${item.price}" 
        onchange="changePrice(${i}, this.value)">
      </td>

      <td>
        <input type="number" value="${item.qty}" 
        onchange="changeQty(${i}, this.value)">
      </td>

      <td>${sub}</td>

      <td><button onclick="removeItem(${i})">X</button></td>
    `;

    tbody.appendChild(tr);
  });

  document.getElementById('total').innerText = total;
}

// تعديل السعر
function changePrice(i, val) {
  val = Number(val);

  if (val < cart[i].min || val > cart[i].max) {
    alert("السعر خارج المسموح");
    return;
  }

  cart[i].price = val;
  renderCart();
}

// تعديل الكمية
function changeQty(i, val) {
  cart[i].qty = Number(val);
  renderCart();
}

// حذف
function removeItem(i) {
  cart.splice(i, 1);
  renderCart();
}

// بيع نقدي
function cashSale() {
  alert("تم البيع نقدي");
  printInvoice();
}

// بيع آجل
function creditSale() {
  let total = Number(document.getElementById('total').innerText);
  let paid = Number(document.getElementById('paid').value || 0);

  let remain = total - paid;

  customer.balance += remain;

  alert("تم البيع آجل");

  document.getElementById('customerBalance').innerText = customer.balance;

  printInvoice();
}

// عميل
function searchCustomer() {
  let name = prompt("اسم العميل");
  if (!name) return;

  customer.name = name;
  document.getElementById('customerName').innerText = name;
}

function addCustomer() {
  alert("إضافة عميل (هنربطها بعدين)");
}

// طباعة
function printInvoice() {

  let total = document.getElementById('total').innerText;

  let win = window.open('', '', 'width=800,height=600');

  win.document.write(`
    <h2>اسم الشركة</h2>
    <p>المندوب: Admin</p>
    <p>العميل: ${customer.name}</p>

    <table border="1" width="100%">
      <tr>
        <th>الصنف</th>
        <th>الكمية</th>
        <th>السعر</th>
      </tr>

      ${cart.map(i => `
        <tr>
          <td>${i.name}</td>
          <td>${i.qty}</td>
          <td>${i.price}</td>
        </tr>
      `).join('')}
    </table>

    <h3>الإجمالي: ${total}</h3>
    <h3>الرصيد الحالي: ${customer.balance}</h3>
  `);

  win.print();
}

renderProducts();

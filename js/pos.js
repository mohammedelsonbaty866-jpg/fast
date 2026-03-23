let products = getData('products');
let customers = getData('customers');
let invoices = getData('invoices');

let filteredProducts = [...products];
let cart = [];

let customer = {
  name: "نقدي",
  balance: 0
};

// ================= المنتجات =================
function renderProducts() {
  const container = document.getElementById('products');
  container.innerHTML = '';

  filteredProducts.forEach((p, i) => {
    const div = document.createElement('div');

    div.innerHTML = `
      <span>${p.name}</span>

      <select onchange="setUnit(${i}, this.value)">
        <option value="unit">وحدة (${p.price})</option>
        ${p.box ? `<option value="box">علبة (${p.box})</option>` : ''}
        ${p.carton ? `<option value="carton">كرتونة (${p.carton})</option>` : ''}
      </select>

      <button onclick="addToCart(${i})">+</button>
    `;

    container.appendChild(div);
  });
}

// ================= البحث =================
function searchProducts() {
  let v = document.getElementById('search').value.toLowerCase();

  filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(v)
  );

  renderProducts();
}

// ================= إضافة =================
function addToCart(i) {
  let p = filteredProducts[i];

  let unit = "unit";
  let price = p.price;

  let select = document.querySelectorAll('#products select')[i];
  if (select) {
    unit = select.value;
    if (unit === "box") price = p.box || p.price;
    if (unit === "carton") price = p.carton || p.price;
  }

  cart.push({
    name: p.name,
    unit,
    price,
    qty: 1,
    min: p.min,
    max: p.max
  });

  renderCart();
}

// ================= السلة =================
function renderCart() {
  const tbody = document.getElementById('cart');
  tbody.innerHTML = '';

  let total = 0;

  cart.forEach((item, i) => {
    let sub = item.price * item.qty;
    total += sub;

    tbody.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.unit}</td>

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
      </tr>
    `;
  });

  document.getElementById('total').innerText = total;
}

// ================= تعديل =================
function changePrice(i, val) {
  val = Number(val);

  if (val < cart[i].min || val > cart[i].max) {
    alert("خارج الحد المسموح");
    return;
  }

  cart[i].price = val;
  renderCart();
}

function changeQty(i, val) {
  cart[i].qty = Number(val);
  renderCart();
}

function removeItem(i) {
  cart.splice(i, 1);
  renderCart();
}

// ================= العميل =================
function searchCustomer() {
  let name = prompt("اسم العميل");

  let c = customers.find(c => c.name === name);

  if (c) {
    customer = c;
  } else {
    customer = { name, balance: 0 };
  }

  document.getElementById('customerName').innerText = customer.name;
  document.getElementById('customerBalance').innerText = customer.balance;
}

// ================= حفظ الفاتورة =================
function saveInvoice(total, paid) {
  let remain = total - paid;

  let invoice = {
    customer: customer.name,
    total,
    paid,
    remain,
    items: cart
  };

  invoices.push(invoice);
  saveData('invoices', invoices);

  // تحديث العميل
  let c = customers.find(c => c.name === customer.name);
  if (c) {
    c.balance += remain;
  }

  saveData('customers', customers);
}

// ================= البيع =================
function cashSale() {
  let total = Number(document.getElementById('total').innerText);

  saveInvoice(total, total);

  alert("تم البيع نقدي");

  cart = [];
  renderCart();
}

function creditSale() {
  let total = Number(document.getElementById('total').innerText);
  let paid = Number(document.getElementById('paid').value || 0);

  saveInvoice(total, paid);

  alert("تم البيع آجل");

  cart = [];
  renderCart();
}

// ================= تشغيل =================
renderProducts();

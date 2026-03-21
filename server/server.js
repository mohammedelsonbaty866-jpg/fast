const express = require('express');
const cors = require('cors');

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// route رئيسي (مهم جدًا لـ Railway)
app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});

// بيانات مؤقتة (بدل database)
let products = [
  { id: 1, name: "Product 1", price: 100, quantity: 10 },
  { id: 2, name: "Product 2", price: 200, quantity: 5 }
];

// جلب المنتجات
app.get('/products', (req, res) => {
  res.json(products);
});

// إضافة منتج
app.post('/products', (req, res) => {
  const { name, price, quantity } = req.body;

  if (!name || !price || !quantity) {
    return res.status(400).json({ error: "Missing data" });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    quantity
  };

  products.push(newProduct);
  res.json(newProduct);
});

// تشغيل السيرفر (مهم جدًا)
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log("Server running on port " + PORT);
});

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// root مهم جدًا
app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});

// بيانات مؤقتة بدل الداتابيز
let products = [
  { id: 1, name: "Test Product", price: 100, quantity: 10 }
];

// get products
app.get('/products', (req, res) => {
  res.json(products);
});

// add product
app.post('/products', (req, res) => {
  const { name, price, quantity } = req.body;

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    quantity
  };

  products.push(newProduct);
  res.json(newProduct);
});

const PORT = process.env.PORT;

app.listen(PORT, '0.0.0.0', () => {
  console.log("Server running on " + PORT);
});

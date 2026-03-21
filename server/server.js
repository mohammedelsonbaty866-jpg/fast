const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// مهم جدًا 👇
app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});

// Get all products
app.get('/products', (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// Add product
app.post('/products', (req, res) => {
  const { name, price, quantity } = req.body;

  db.run(
    "INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)",
    [name, price, quantity],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID });
    }
  );
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

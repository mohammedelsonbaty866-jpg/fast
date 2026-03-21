const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/products', (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

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

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

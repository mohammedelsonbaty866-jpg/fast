const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// نخلي الداتابيز في مسار واضح
const dbPath = path.join(__dirname, 'pos.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Database error:", err);
  } else {
    console.log("Database connected");
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price REAL,
      quantity INTEGER
    )
  `);
});

module.exports = db;

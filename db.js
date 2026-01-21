const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      password TEXT,
      role TEXT,
      bio TEXT
    )
  `);

  db.run(`
    INSERT INTO users (username, password, role, bio)
    VALUES ('admin', 'admin123', 'admin', '<script>alert("XSS")</script>')
  `);
});

module.exports = db;

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

const bcrypt = require('bcrypt');

const SALT_ROUNDS = 12;

const hashedPassword = await bcrypt.hash('admin123', SALT_ROUNDS);

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
    VALUES (?, ?, ?, ?)
  `, [
    'admin',
    '$2b$12$uY8...REDACTED...',
    'admin',
    '<script>alert("XSS")</script>'
  ]);
});

module.exports = db;

// username and password INSERT function above may be vulnerable when storing in the database in plain text. 
// alert() under the script tag might be vulnerable to a reflected XSS vulnerability 
// Line 18 with Values is vulnerable due to a weak password policy as well as the fact that they are stored in plain text. 

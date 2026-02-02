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

// username and password INSERT function above may be vulnerable when storing in the database in plain text. 
// alert() under the script tag might be vulnerable to a reflected XSS vulnerability 
// Line 18 with Values is vulnerable due to a weak password policy as well as the fact that they are stored in plain text. 

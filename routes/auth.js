const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

const bcrypt = require('bcrypt');

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { username, password } = req.body; 
  // lack of input sanitization in this login request. Username and password is accepted without any parameter checks

  const query = `
    SELECT * FROM users
    WHERE username = ?
    AND password = ?
  `;

  // const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  const values = [username, password]; 
  db.get(
    'SELECT * FROM users WHERE username = ?',
    [username],
    async (err, user) => {
      if (!user) {
        return res.status(401).send("Invalid credentials");
      }
  
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(401).send("Invalid credentials");
      }
  
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.json({ token });
    }
  );
});

module.exports = router;

const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = `
    SELECT * FROM users
    WHERE username = '${username}'
    AND password = '${password}'
  `;

  db.get(query, (err, user) => {
    if (user) {
      const token = jwt.sign(user, req.app.locals.jwtSecret);
      res.json({ token });
    } else {
      res.status(401).send("Invalid credentials");
    }
  });
});

module.exports = router;

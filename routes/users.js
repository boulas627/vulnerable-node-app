const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

router.get('/profile', (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.decode(token);
  // using decode may be vulnerable because it doesn't validate signatures. Server side validation is required of JWT's

  db.get(
    `SELECT * FROM users WHERE id = ${decoded.id}`,
    (err, user) => {
      res.render('profile', { user });
    }
  );
});

module.exports = router;

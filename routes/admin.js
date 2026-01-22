const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/dashboard', (req, res) => {
  const token = req.headers.authorization;
  const user = jwt.decode(token);
  // using decode as mentioned above is vulnerable 

  if (user.role === 'admin') {
    res.send("Welcome to admin dashboard");
  } else {
    res.status(403).send("Forbidden");
  }
});

module.exports = router;

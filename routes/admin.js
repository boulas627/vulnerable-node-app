const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/dashboard', (req, res) => {
  const token = req.headers.authorization;
  // const user = jwt.decode(token);
  // using decode as mentioned above is vulnerable 
  const user = jwt.verify(token, process.env.JWT_SECRET)
  req.user = user; 

  if (req.user.role === 'admin') {
    res.send("Welcome to admin dashboard");
  } else {
    res.status(403).send("Forbidden");
  }
});

module.exports = router;

// unsure about rbac here. This would need to be confirmed 

// jwt.verify() will validate the token signature while decode() will extract the header and paylaod without checking the signature
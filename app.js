const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.locals.jwtSecret = "supersecret";
// having the jwtSecret here may be vulnerable 

app.use('/', authRoutes);
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

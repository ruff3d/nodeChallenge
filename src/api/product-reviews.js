const express = require('express');
const morgan = require('morgan');
const ReviewsController = require("../controllers/ReviewsController");
const UserController = require("../controllers/UserController");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', function(req, res) {
  res.send('Hello! The API is running at http://localhost:' + PORT);
});

const apiRoutes = express.Router();
new UserController(apiRoutes);
new ReviewsController(apiRoutes);
app.use('/api', apiRoutes);

module.exports = app;

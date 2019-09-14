const express = require('express');
const ProductController = require('../controllers/ProductController');

const app = express();
app.use(express.json());
const apiRoutes = new express.Router();
new ProductController(apiRoutes);
app.use(apiRoutes);

module.exports = app;

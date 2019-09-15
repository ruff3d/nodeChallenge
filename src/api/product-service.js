const express = require('express');
const morgan = require('morgan');
const {createLogger} = require('winston');
const ProductController = require('../controllers/ProductController');

const logger = createLogger();
const app = express();
app.use(express.json());
app.use(morgan('dev'));
const apiRoutes = new express.Router();
new ProductController(apiRoutes, logger);
app.use(apiRoutes);

module.exports = app;

const express = require('express');
const morgan = require('morgan');
const {createLogger} = require('winston');
const ReviewsController = require("../controllers/ReviewsController");
const UserController = require("../controllers/UserController");

const logger = createLogger();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

const apiRoutes = express.Router();
try {
    new UserController(apiRoutes);
    new ReviewsController(apiRoutes);
} catch (e) {
    logger.error(e);
}
app.use('/api', apiRoutes);

module.exports = app;

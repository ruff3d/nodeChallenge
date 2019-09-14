const express = require('express');
const morgan = require('morgan');

import ReviewsController from "../controllers/reviewsController";
import {User} from '../models/users';
import {authMiddleware} from '../lib/auth';
const PORT = process.env.PORT || 3027;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', function(req, res) {
  res.send('Hello! The API is running at http://localhost:' + PORT);
});

app.get('/setup', function(req, res) {

  var user = new User({
    name: 'default',
    password: 'password',
    admin: true
  });

  user.save(function(err) {
    if (err) throw err;

    res.json({
      success: true
    });
  });
});

const apiRoutes = express.Router();
new ReviewsController(apiRoutes, User, Reviews, authMiddleware());
app.use('/api', apiRoutes);

export default app;

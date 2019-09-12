const express = require('express');
const morgan = require('morgan');
const User = require('../models/users');
const {authMiddleware} = require('../lib/auth');
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

app.use('/api', apiRoutes);
apiRoutes.post('/authenticate', function(req, res) {

  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    } else if (user) {
      if (user.password != req.body.password) {
        res.status(401).json({
          success: false,
          message: 'Authentication failed. Wrong password.'
        });
      } else {
        const payload = {
          admin: user.admin
        };
        let token = Auth.sign(payload);
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  });
});

apiRoutes.use(authMiddleware);

apiRoutes.get('/', function(req, res) {
  res.json({
    message: 'Welcome to the product reviews API'
  });
});

apiRoutes.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});


app.get('/api/review/:product_id', (req, res) => {
  var id = req.params.product_id;
  con.query('select * from product_reviews where product_id =?', [id], function(err, rows) {
    if (err) throw err;
    res.json({
      rows
    });
  });
});

app.post('/api/review/', (req, res) => {
  let input = req.body;
  let data = {
    product_id: input.product_id,
    avg_review_score: input.avg_review_score,
    num_of_reviews: input.num_of_reviews
  };
  con.query('insert into product_reviews set ?', data, function(err, rows) {
    if (err) throw err;
    res.json({
      rows
    });
  });
});

app.put('/api/review/:product_id', (req, res) => {
  var input = req.body;
  var id = req.params.product_id;
  var data = {
    avg_review_score: input.avg_review_score,
    num_of_reviews: input.num_of_reviews
  };
  con.query('update product_reviews set ? where product_id = ?', [data, id], function(err, rows) {
    if (err) throw err;
    res.json({
      rows
    });
  });
});

app.delete('/api/review/:product_id', (req, res) => {
  var id = req.params.product_id;
  con.query('delete from product_reviews where product_id =?', [id], function(err, rows) {
    if (err) throw err;
    res.json({
      rows
    });
  });
});
module.exports = app;

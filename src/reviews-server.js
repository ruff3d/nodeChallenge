const app = require('./api/product-reviews');
const PORT = process.env.PORT || 3027;

app.listen(PORT, function() {
  console.log('Express server for reviews service listening on port ' + PORT);
});

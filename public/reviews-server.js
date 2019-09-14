import app from './api/product-reviews';
const PORT = process.env.PORT || 3029;

app.listen(PORT, function() {
  console.log('Express server for product service listening on port ' + PORT);
});

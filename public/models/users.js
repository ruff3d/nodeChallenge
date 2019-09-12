const mongoStore = require('../store/mongoStore');

module.exports = mongoStore.model('User', new mongoStore.Schema({
    name: String,
    password: String,
    admin: Boolean 
}));

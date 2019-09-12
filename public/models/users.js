const mongoStore = require('../store/mongoStore');

module.exports = mongoStore.model('User', new Schema({
    name: String,
    password: String,
    admin: Boolean 
}));

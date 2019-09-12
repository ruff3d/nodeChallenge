const mongoose = require('mongoose');
const {MongodbConfig} = require('../config');

module.exports = mongoose.connect(MongodbConfig.database);

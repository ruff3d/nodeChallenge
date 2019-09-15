const mongoose = require('mongoose');
const {MongodbConfig} = require('../config');

const connection = mongoose.connect(MongodbConfig.database);
const Schema = mongoose.Schema;

module.exports = {
    connection,
    Schema,
    Model: mongoose.model
};


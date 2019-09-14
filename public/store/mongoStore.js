const mongoose = require('mongoose');
import config from '../config';

export const connection = mongoose.connect(config.MongodbConfig.database);
export const Schema = mongoose.Schema;


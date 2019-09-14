const Sequelize = require('sequelize');
import config from '../config';

export const connection = new Sequelize(
    config.MysqlConfig.database,
    config.MysqlConfig.user,
    config.MysqlConfig.password,
    {
        host: config.MysqlConfig.host,
        dialect: 'mysql'
    }
);

export const Model =  Sequelize.Model;

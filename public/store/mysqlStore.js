const Sequelize = require('sequelize');
const {MysqlConfig} = require('../config');
const sequelize = new Sequelize(
    MysqlConfig.database,
    MysqlConfig.user,
    MysqlConfig.password,
    {
        host: MysqlConfig.host,
        dialect: 'mysql'
    }
);

module.exports = sequelize;

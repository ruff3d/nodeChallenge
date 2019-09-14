const Sequelize = require("sequelize");
const {MysqlConfig} = require('../config');

const connection = new Sequelize(
    MysqlConfig.database,
    MysqlConfig.user,
    MysqlConfig.password,
    {
        host: MysqlConfig.host,
        dialect: 'mysql'
    }
);

module.exports = {
    Model : Sequelize.Model,
    Types : Sequelize.DataTypes,
    connection: connection
};

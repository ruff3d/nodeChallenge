const sequelize = require("sequelize");
const {MysqlConfig} = require('../config');

const connection = new sequelize.Sequelize(
    MysqlConfig.database,
    MysqlConfig.user,
    MysqlConfig.password,
    {
        host: MysqlConfig.host,
        dialect: 'mysql'
    }
);

connection.authenticate();

module.exports = {
    Model : sequelize.Model,
    Types : sequelize.DataTypes,
    connection: connection,
    sequelize: sequelize,
};

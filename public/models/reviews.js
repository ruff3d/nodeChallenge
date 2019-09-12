const mysqlStore = require('../store/mysqlStore');

class ProductReviews extends mysqlStore.Model {
    static init(mysqlStore, DataTypes) {
        return super.init({
                id: {type: DataTypes.INTEGER, autoIncrement: true, unique: true},
                productId: DataTypes.STRING,
                description: DataTypes.STRING,
                user: DataTypes.STRING
            },
            {
                tableName: "product_reviews",
                mysqlStore
            });
    }
}

module.exports = ProductReviews.init(mysqlStore, mysqlStore);

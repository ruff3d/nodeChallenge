import {connection, Model} from "../store/mysqlStore";

class ProductReviews extends Model {
    static init(connection, DataTypes) {
        return super.init({
                id: {type: DataTypes.INTEGER, autoIncrement: true, unique: true},
                product_id: DataTypes.STRING,
                description: DataTypes.STRING,
                user: DataTypes.STRING
            },
            {
                tableName: "product_reviews",
                connection
            });
    }
}

module.exports = ProductReviews.init(connection, connection.DataTypes);

const {connection, Model, Types} = require("../store/mysqlStore");

class ProductReviews extends Model {
    static init(connection, Types) {
        connection.authenticate();
        return super.init({
                id: {type: Types.INT, autoIncrement: true, unique: true},
                product_id: Types.STRING,
                description: Types.STRING,
                user: Types.STRING
            },
            {
                tableName: "product_reviews",
                connection
            });
    }

    static async updateReview(product_id, avg_review_score, num_of_reviews){
        await this.upsert({
            product_id,
            avg_review_score,
            num_of_reviews
        });
    }

    static async deleteReview(product_id){
        await this.destroy({where: {product_id: product_id}});
    }

    static async getReview(product_id){
        await this.findOne({where: {product_id: product_id}});
    }

    static async getReviews(){
        await this.findAll();
    }
}
module.exports = ProductReviews.init(connection, Types);

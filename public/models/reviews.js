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

    async static updateReview(product_id, avg_review_score, num_of_reviews){
        await this.upsert({
            product_id,
            avg_review_score,
            num_of_reviews
        });
    }

    async static deleteReview(product_id){
        await this.destroy({where: {product_id: product_id}});
    }

    async static getReview(product_id){
        await this.findOne({where: {product_id: product_id}});
    }

    async static getReviews(){
        await this.findAll();
    }

}

export const Reviews = ProductReviews.init(connection, connection.DataTypes);

const {Model, sequelize, connection} = require("../store/mysqlStore");

class Reviews extends Model {
    static init(seq) {
        return super.init({
                id: {type: sequelize.INTEGER, primaryKey: true},
                product_id: sequelize.STRING,
                description: sequelize.STRING,
                user: sequelize.STRING,
            },
            {
                sequelize: seq,
                modelName: "Reviews",
                tableName: "product_reviews"
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

Reviews.init(connection);
module.exports = Reviews;

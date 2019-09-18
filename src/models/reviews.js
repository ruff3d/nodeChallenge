const {Model, sequelize, connection} = require("../store/mysqlStore");

class Reviews extends Model {
    static async updateReview(product_id, avg_review_score, num_of_reviews){
        await self.upsert({
            product_id,
            avg_review_score,
            num_of_reviews
        });
    }

    static async deleteReview(product_id){
        await self.destroy({where: {product_id: product_id}});
    }

    static async getReview(product_id){
        await self.findOne({where: {product_id: product_id}});
    }

    static async getReviews(){
        await self.findAll();
    }
}

Reviews.init({
        id: {type: sequelize.INTEGER, primaryKey: true},
        product_id: sequelize.STRING,
        description: sequelize.STRING,
        user: sequelize.STRING,
    },
    {
        sequelize: connection,
        modelName: "Reviews",
        tableName: "product_reviews"
    });

module.exports = Reviews;

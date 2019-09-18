const {Model, sequelize, connection} = require("../store/mysqlStore");

class Reviews extends Model {
    static async updateReview(id, description, score) {
        let review = await Reviews.findByPk(id);
        if (!review) return;
        review.description = description;
        review.score = score;
        review.updatedAt = Date.now();
        review.save();
        return review;
    }

    static async addReview(product_id, description, score, user) {
        return Reviews.create({
            product_id: product_id,
            description: description,
            score: score,
            user: user,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });
    }

    static async deleteReview(id) {
        return Reviews.destroy({where: {id: id}});
    }

    static async getReviewById(id) {
        return Reviews.findByPk(id);
    }

    static async getReviewsByProductId(product_id) {
        return Reviews.findAll({where: {product_id: product_id}});
    }

    static async getAllReviews() {
        return Reviews.findAll();
    }

    static async getReviewStatisticByProductId(product_id) {
        return Reviews.findAll({
            limit: 1,
            where: {product_id: product_id},
            attributes: [
                'product_id',
                [sequelize.fn('COUNT', sequelize.col('id')), 'num_of_reviews'],
                [sequelize.fn('AVG', sequelize.col('score')), 'avg_review_score']
            ]
        });
    }
}

Reviews.init({
        id: {type: sequelize.INTEGER, primaryKey: true},
        product_id: sequelize.INTEGER,
        description: sequelize.STRING,
        createdAt: sequelize.DATE,
        updatedAt: sequelize.DATE,
        score: sequelize.INTEGER,
        user: sequelize.STRING,
    },
    {
        sequelize: connection,
        modelName: "Reviews",
        tableName: "product_reviews"
    });

module.exports = Reviews;

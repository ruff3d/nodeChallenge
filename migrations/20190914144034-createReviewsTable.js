'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("product_reviews", {
            id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
            product_id: {type: Sequelize.STRING},
            description: {type: Sequelize.STRING},
            createdAt: {type: Sequelize.DATE},
            updatedAt: {type: Sequelize.DATE},
            score: {type: Sequelize.INTEGER},
            user: {type: Sequelize.STRING},
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("product_reviews");
    }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable("product_reviews", {
        id: {type: Sequelize.INTEGER, primaryKey: true},
        product_id: {type: Sequelize.STRING},
        description: {type: Sequelize.STRING},
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable("product_reviews");
  }
};

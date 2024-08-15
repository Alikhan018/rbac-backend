"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("EntityFeatures", {
      featureId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: "Features",
          key: "id",
        },
      },
      entityName: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      entityId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("EntityFeatures");
  },
};

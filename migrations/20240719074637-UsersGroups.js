'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('UsersGroups', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      groupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Groups',
          key: 'id'
        }
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('UsersGroups')
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('RolesGroups', {
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Roles',
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
    await queryInterface.dropTable('RolesGroups')
  }
};

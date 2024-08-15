"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Features", [
      {
        id: 7,
        name: "Create",
        entityType: "Groups",
      },
      {
        id: 8,
        name: "Read",
        entityType: "Groups",
      },
      {
        id: 9,
        name: "Update",
        entityType: "Groups",
      },
      {
        id: 10,
        name: "Delete",
        entityType: "Groups",
      },
      {
        id: 11,
        name: "Create",
        entityType: "Users",
      },
      {
        id: 12,
        name: "Read",
        entityType: "Users",
      },
      {
        id: 13,
        name: "Update",
        entityType: "Users",
      },
      {
        id: 14,
        name: "Delete",
        entityType: "Users",
      },
      {
        id: 15,
        name: "Create",
        entityType: "Roles",
      },
      {
        id: 16,
        name: "Read",
        entityType: "Roles",
      },
      {
        id: 17,
        name: "Update",
        entityType: "Roles",
      },
      {
        id: 18,
        name: "Delete",
        entityType: "Roles",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Features", null, {});
  },
};

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Features", [
      {
        id: 1,
        name: "Create",
        entityType: "Student",
      },
      {
        id: 2,
        name: "Read",
        entityType: "Student",
      },
      {
        id: 3,
        name: "Update",
        entityType: "Student",
      },
      {
        id: 4,
        name: "Delete",
        entityType: "Student",
      },
    ]);
    await queryInterface.bulkInsert("EntityFeatures", [
      // {
      //   featureId: 1,
      //   entityName: "Roles",
      //   entityId: 28,
      // },
      {
        featureId: 2,
        entityName: "Roles",
        entityId: 28,
      },
      {
        featureId: 3,
        entityName: "Roles",
        entityId: 28,
      },
      {
        featureId: 4,
        entityName: "Roles",
        entityId: 28,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

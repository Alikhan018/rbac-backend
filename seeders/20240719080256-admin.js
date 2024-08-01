"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        id: 1,
        email: "admin@email.com",
        password: "admin",
      },
    ]);
    await queryInterface.bulkInsert("Roles", [
      {
        id: 1,
        name: "Admin",
      },
    ]);
    await queryInterface.bulkInsert("Groups", [
      {
        id: 1,
        name: "Admin",
      },
    ]);
    await queryInterface.bulkInsert("Features", [
      {
        id: 1,
        name: "Admin",
        entityType: "all",
      },
    ]);
    await queryInterface.bulkInsert("UsersRoles", [
      {
        userId: 1,
        roleId: 1,
      },
    ]);
    await queryInterface.bulkInsert("UsersGroups", [
      {
        userId: 1,
        groupId: 1,
      },
    ]);
    await queryInterface.bulkInsert("RolesGroups", [
      {
        roleId: 1,
        groupId: 1,
      },
    ]);
    await queryInterface.bulkInsert("EntityFeatures", [
      {
        featureId: 1,
        entityName: "Roles",
        entityId: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("UsersRoles", {
      userId: 1
    });
    await queryInterface.bulkDelete("UsersGroups", {
      userId: 1
    });
    await queryInterface.bulkDelete("RolesGroups", {
      roleId: 1
    });
    await queryInterface.bulkDelete("EntityFeatures", {
      featureId: 1
    });
    await queryInterface.bulkDelete("Users", {
      id: 1
    });
    await queryInterface.bulkDelete("Features", {
      id: 1
    });
    await queryInterface.bulkDelete("Groups", {
      id: 1
    });
    await queryInterface.bulkDelete("Roles", {
      id: 1
    });
  },
};

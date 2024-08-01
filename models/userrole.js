"use strict";
const { Model, DataTypes } = require("sequelize");

class UserRole extends Model {}

const initUserRole = (sequelize) => {
  UserRole.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
        primaryKey: true,
      },
      roleId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Role",
          key: "id",
        },
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "UserRole",
      tableName: "UsersRoles",
      timestamps: false,
    }
  );
  return UserRole;
};

module.exports = initUserRole;

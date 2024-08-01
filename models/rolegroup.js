"use strict";
const { Model, DataTypes } = require("sequelize");

class RoleGroup extends Model {}

const initRoleGroup = (sequelize) => {
  RoleGroup.init(
    {
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Role",
          key: "id",
        },
        primaryKey: true,
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Group",
          key: "id",
        },
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "RoleGroup",
      tableName: "RolesGroups",
      timestamps: false,
    }
  );
  return RoleGroup;
};

module.exports = initRoleGroup;

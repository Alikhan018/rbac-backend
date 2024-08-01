"use strict";
const { Model, DataTypes } = require("sequelize");

class UserGroup extends Model {}

const initUserGroup = (sequelize) => {
  UserGroup.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
        primaryKey: true,
      },
      groupId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Group",
          key: "id",
        },
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "UserGroup",
      tableName: "UsersGroups",
      timestamps: false,
    }
  );
  return UserGroup;
};

module.exports = initUserGroup;

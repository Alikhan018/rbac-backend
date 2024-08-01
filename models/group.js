"use strict";
const { Model, DataTypes } = require("sequelize");

class Group extends Model {
  static associate(models) {
    Group.belongsToMany(models.User, {
      through: models.UserGroup,
      foreignKey: "groupId",
      otherKey: "userId",
      as: "users",
    });
    Group.belongsToMany(models.Role, {
      through: models.RoleGroup,
      foreignKey: "groupId",
      otherKey: "roleId",
      as: "roles",
    });
    Group.belongsToMany(models.Feature, {
      through: models.FeaturePerms,
      foreignKey: "entityId",
      constraints: false,
      as: "features",
    });
  }
}

const initGroup = (sequelize) => {
  Group.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Group",
      tableName: "Groups",
      timestamps: false,
    }
  );
  return Group;
};

module.exports = initGroup;

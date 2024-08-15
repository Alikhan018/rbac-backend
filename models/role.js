"use strict";
const { Model, DataTypes } = require("sequelize");

class Role extends Model {
  static associate(models) {
    Role.belongsToMany(models.Feature, {
      through: models.FeaturePerms,
      foreignKey: "entityId",
      constraints: false,
      as: "features",
    });
    Role.belongsToMany(models.User, {
      through: models.UserRole,
      foreignKey: "roleId",
      otherKey: "userId",
      as: "users",
    });
    Role.belongsToMany(models.Group, {
      through: models.RoleGroup,
      foreignKey: "roleId",
      otherKey: "groupId",
      as: "groups",
    });
  }
}

const initRole = (sequelize) => {
  Role.init(
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
      modelName: "Role",
      tableName: "Roles",
      timestamps: false,
    }
  );
  return Role;
};

module.exports = initRole;

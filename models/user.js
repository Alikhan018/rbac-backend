"use strict";
const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static associate(models) {
    User.belongsToMany(models.Group, {
      through: models.UserGroup,
      foreignKey: "userId",
      otherKey: "groupId",
      as: "groups",
    });
    User.belongsToMany(models.Role, {
      through: models.UserRole,
      foreignKey: "userId",
      otherKey: "roleId",
      as: "roles",
    });
    User.belongsToMany(models.Feature, {
      through: models.FeaturePerms,
      foreignKey: "entityId",
      constraints: false,
      as: "features",
    });
  }
}

const initUser = (sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      timestamps: false,
    }
  );
  return User;
};

module.exports = initUser;

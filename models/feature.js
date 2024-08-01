"use strict";
const { Model, DataTypes } = require("sequelize");

class Feature extends Model {
  static associate(models) {
    Feature.belongsToMany(models.User, {
      through: models.FeaturePerms,
      foreignKey: "featureId",
    });
    Feature.belongsToMany(models.Role, {
      through: models.FeaturePerms,
      foreignKey: "featureId",
      as: "roles",
    });
    Feature.belongsToMany(models.Group, {
      through: models.FeaturePerms,
      foreignKey: "featureId",
    });
  }
}

const initFeature = (sequelize) => {
  Feature.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      entityType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Feature",
      tableName: "Features",
      timestamps: false,
    }
  );
  return Feature;
};

module.exports = initFeature;

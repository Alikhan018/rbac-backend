"use strict";
const { Model, DataTypes } = require("sequelize");

class FeaturePerms extends Model {
  static associate(models) {
    FeaturePerms.belongsTo(models.Feature, {
      foreignKey: "featureId",
      as: "feature",
    });
  }
}

const initFeaturePerms = (sequelize) => {
  FeaturePerms.init(
    {
      featureId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Feature",
          key: "id",
        },
        primaryKey: true,
      },
      entityName: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      entityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "FeaturePerms",
      tableName: "EntityFeatures",
      timestamps: false,
    }
  );
  return FeaturePerms;
};

module.exports = initFeaturePerms;

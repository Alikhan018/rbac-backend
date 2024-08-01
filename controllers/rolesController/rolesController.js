const db = require("../../models");

class RolesController {
  constructor() {}
  static async getAll(req, res) {
    try {
      const roles = await db.Role.findAll();
      res.json({
        status: "success",
        data: roles,
      });
    } catch (err) {
      res.json({
        status: "error",
        message: err.message,
      });
    }
  }
  static async getRole(req, res) {
    const id = req.params.roleId;
    try {
      console.log(id);
      const role = await db.Role.findOne({
        where: { id: id },
        include: [
          { model: db.User, as: "users" },
          { model: db.Group, as: "groups" },
          {
            model: db.Feature,
            as: "feature",
            through: {
              model: db.FeaturePerms,
              where: {
                entityId: parseInt(id),
              },
            },
          },
        ],
      });
      res.json({
        status: "success",
        data: role,
      });
    } catch (err) {
      console.log(err);
      res.json({
        status: "error",
        message: err.message,
      });
    }
  }
  static async createRole(req, res) {
    const { name, features } = req.body;
    try {
      const role = await db.Role.create({ name });
      const featureCollection = features.map(async (feature) => {
        await db.Feature.findOne({
          where: {
            [db.Sequelize.and]: [
              { entityType: feature.entityType },
              { name: feature.name },
            ],
          },
        });
      });
      featureCollection.map(async (feature) => {
        await db.FeaturePerms.create({
          entityId: role.dataValues.id,
          featureId: feature.id,
          entityName: "Roles",
        });
      });
      res.json({
        status: "success",
      });
    } catch (err) {
      res.json({
        status: "error",
        message: err.message,
      });
    }
  }
  static async updateRole(req, res) {
    const roleId = req.params.roleId;
    const { name, features } = req.body;
    try {
      await db.Role.update(name, {
        where: {
          id: roleId,
        },
      });
      const featureCollection = await Promise.all(
        features.map(async (feature) => {
          return await db.Feature.findOne({
            where: {
              [db.Sequelize.Op.and]: [
                { entityType: feature.entityType },
                { name: feature.name },
              ],
            },
          });
        })
      );
      if (!featureCollection || featureCollection[0] === null) {
        throw { message: "No feature found!" };
      }
      await db.FeaturePerms.destroy({
        where: {
          entityId: roleId,
          entityName: "Roles",
        },
      });
      featureCollection.map(async (feature) => {
        await db.FeaturePerms.upsert({
          entityId: roleId,
          featureId: feature.id,
          entityName: "Roles",
        });
      });
      res.json({
        status: "success",
      });
    } catch (err) {
      console.log(err);
      res.json({
        status: "error",
        message: err.message,
      });
    }
  }
  static async deleteRole(req, res) {
    const { roleId } = req.params;
    try {
      await db.FeaturePerms.destroy({
        where: {
          [db.Sequelize.Op.and]: [
            { entityId: roleId },
            { entityName: "Roles" },
          ],
        },
      });
      await db.UserRole.destroy({ where: { roleId: roleId } });
      await db.RoleGroup.destroy({ where: { roleId: roleId } });
      await db.Role.destroy({
        where: { id: roleId },
      });
      res.json({
        status: "success",
        message: "role destroyed",
      });
    } catch (err) {
      console.log(err);
      res.json({
        status: "error",
        message: err.message,
      });
    }
  }
}

module.exports = RolesController;

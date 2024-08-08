const db = require("../models");

class GroupController {
  constructor() {}
  static async getAll(req, res) {
    try {
      const groups = await db.Group.findAll({ order: [["id", "ASC"]] });
      res.json({
        status: "success",
        data: groups,
      });
    } catch (err) {
      res.json({
        status: "error",
        message: err.message,
      });
    }
  }
  static async getGroup(req, res) {
    const id = req.params.groupId;
    try {
      const group = await db.Group.findOne({
        where: { id: id },
        include: [
          {
            model: db.Role,
            as: "roles",
          },
          {
            model: db.User,
            as: "users",
          },
          {
            model: db.Feature,
            as: "features",
          },
        ],
      });
      res.json({
        status: "success",
        data: group,
      });
    } catch (err) {
      res.json({
        status: "error",
        message: err.message,
      });
    }
  }
  static async createGroup(req, res) {
    const { name, roles, users, features } = req.body;
    try {
      const group = await db.Group.create({ name });

      if (roles && roles.length > 0) {
        const rolesCollection = await Promise.all(
          roles.map(async (role) => {
            return await db.Role.findOne({
              where: {
                id: role.id,
              },
            });
          })
        );

        await Promise.all(
          rolesCollection.map(async (role) => {
            await db.RoleGroup.create({
              roleId: role.id,
              groupId: group.dataValues.id,
            });
          })
        );
      }

      if (users && users.length > 0) {
        const usersCollection = await Promise.all(
          users.map(async (user) => {
            return await db.User.findOne({
              where: {
                id: user.id,
              },
            });
          })
        );
        await Promise.all(
          usersCollection.map(async (user) => {
            await db.UserGroup.create({
              userId: user.id,
              groupId: group.dataValues.id,
            });
          })
        );
      }

      if (features && features.length > 0) {
        const featureCollection = await Promise.all(
          features.map(async (feature) => {
            return await db.Feature.findOne({
              where: {
                [db.Sequelize.and]: [
                  { entityType: feature.entityType },
                  { name: feature.name },
                ],
              },
            });
          })
        );

        await Promise.all(
          featureCollection.map(async (feature) => {
            await db.FeaturePerms.create({
              entityId: group.dataValues.id,
              featureId: feature.id,
              entityName: "Groups",
            });
          })
        );
      }

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

  static async updateGroup(req, res) {
    const id = req.params.groupId;
    const { name, features } = req.body;
    try {
      await db.Group.update(name, {
        where: {
          id: id,
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
          entityId: id,
          entityName: "Groups",
        },
      });
      featureCollection.map(async (feature) => {
        await db.FeaturePerms.upsert({
          entityId: id,
          featureId: feature.id,
          entityName: "Groups",
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
  static async deleteGroup(req, res) {
    const id = req.params.groupId;
    try {
      const featureperm = await db.FeaturePerms.findOne({
        where: {
          [db.Sequelize.Op.and]: [{ entityId: id }, { entityName: "Groups" }],
        },
      });
      if (featureperm)
        await db.FeaturePerms.destroy({
          where: {
            [db.Sequelize.Op.and]: [{ entityId: id }, { entityName: "Groups" }],
          },
        });
      const usergroup = await db.UserGroup.findOne({ where: { groupId: id } });
      if (usergroup) await db.UserGroup.destroy({ where: { groupId: id } });
      const rolegroup = await db.RoleGroup.findOne({ where: { groupId: id } });
      if (rolegroup) await db.RoleGroup.destroy({ where: { groupId: id } });
      await db.Group.destroy({
        where: { id: id },
      });
      res.json({
        status: "success",
        message: "group destroyed",
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

module.exports = GroupController;

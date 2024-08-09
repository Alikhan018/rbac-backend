const db = require("../models");

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
    const { name, groups, users, features } = req.body;
    try {
      const role = await db.Role.create({ name });
      if (groups && groups.length > 0) {
        const groupsCollection = await Promise.all(
          groups.map(async (group) => {
            await db.Group.findOne({
              where: {
                id: group.id,
              },
            });
          })
        );
        await Promise.all(
          groupsCollection.map(async (group) => {
            await db.RoleGroup.create({
              groupId: group.id,
              roleId: role.dataValues.id,
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
            await db.UserRole.create({
              userId: user.id,
              roleId: role.dataValues.id,
            });
          })
        );
      }
      if (features && features.length > 0) {
        const featureCollection = await Promise.all(
          features.map(async (feature) => {
            await db.Feature.findOne({
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
              entityId: role.dataValues.id,
              featureId: feature.id,
              entityName: "Roles",
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
  static async updateRole(req, res) {
    const roleId = req.params.roleId;
    const { name, users, groups, features } = req.body;
    try {
      await db.Role.update(
        { name },
        {
          where: {
            id: roleId,
          },
        }
      );
      if (users) {
        await db.UserRole.destroy({ where: { roleId } });
        await Promise.all(
          users.map(
            async (user) =>
              await db.UserRole.create({
                userId: user.id,
                roleId,
              })
          )
        );
      } else {
      }
      if (groups) {
        await db.RoleGroup.destroy({ where: { roleId } });
        await Promise.all(
          groups.map(
            async (group) =>
              await db.RoleGroup.create({
                groupId: group.id,
                roleId,
              })
          )
        );
      } else {
      }
      if (features) {
        await db.FeaturePerms.destroy({
          where: {
            entityId: id,
            entityName: "Groups",
          },
        });
        await features.map(async (feature) => {
          await db.FeaturePerms.create({
            entityId: id,
            featureId: feature.id,
            entityName: "Groups",
          });
        });
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
  static async deleteRole(req, res) {
    const { roleId } = req.params;
    try {
      const featureperms = await db.FeaturePerms.findOne({
        where: {
          [db.Sequelize.Op.and]: [
            { entityId: roleId },
            { entityName: "Roles" },
          ],
        },
      });
      if (featureperms)
        await db.FeaturePerms.destroy({
          where: {
            [db.Sequelize.Op.and]: [
              { entityId: roleId },
              { entityName: "Roles" },
            ],
          },
        });
      const userrole = await db.UserRole.findOne({ where: { roleId } });
      if (userrole) await db.UserRole.destroy({ where: { roleId: roleId } });
      const rolegroup = await db.RoleGroup.findOne({ where: { roleId } });
      if (rolegroup) await db.RoleGroup.destroy({ where: { roleId: roleId } });
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

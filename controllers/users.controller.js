const db = require("../models");

class UserController {
  constructor() {}
  static async getAll(req, res) {
    try {
      const users = await db.User.findAll({ order: [["id", "ASC"]] });
      res.json({
        status: "success",
        data: users,
      });
    } catch (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
  }
  static async getUser(req, res) {
    const userId = req.params.userId;
    try {
      const user = await db.User.findOne({
        where: { id: userId },
        include: [
          {
            model: db.Role,
            as: "roles",
          },
          {
            model: db.Group,
            as: "groups",
          },
          {
            model: db.Feature,
            as: "features",
          },
        ],
      });
      res.json({
        status: "success",
        data: user,
      });
    } catch (err) {
      console.log(err);
      res.json({
        status: "error",
        message: err,
      });
    }
  }
  static async createUser(req, res) {
    const { email, password, roles, groups } = req.body;
    try {
      const user = await db.User.create({
        email,
        password,
      });
      if (roles)
        if (roles.length > 0) {
          roles.map(
            async (role) =>
              await db.UserRole.create({
                userId: user.dataValues.id,
                roleId: role.id,
              })
          );
        }
      if (groups)
        if (groups.length > 0) {
          groups.map(
            async (group) =>
              await db.UserGroup.create({
                userId: user.dataValues.id,
                groupId: group.id,
              })
          );
        }
      res.json({
        status: "success",
        message: "user created!",
      });
    } catch (err) {
      console.log(err);
      res.json({
        status: "error",
        message: err,
      });
    }
  }
  static async updateUser(req, res) {
    const userId = req.params.userId;
    const { email, roles, groups } = req.body;
    try {
      const user = await db.User.update(email, {
        where: { id: userId },
      });
      if (roles.length === 0) {
        await db.UserRole.destroy({ where: { userId: userId } });
      } else if (roles.length > 0) {
        roles.map(
          async (role) =>
            await db.UserRole.upsert({
              userId: user.dataValues.id,
              roleId: role.id,
            })
        );
      } else {
      }
      if (groups.length === 0) {
        await db.UserGroup.destroy({ where: { userId: userId } });
      } else if (groups.length > 0) {
        groups.map(
          async (group) =>
            await db.UserGroup.upsert({
              userId: user.dataValues.id,
              groupId: group.id,
            })
        );
      } else {
      }
      res.json({
        status: "success",
        message: "user updated!",
      });
    } catch (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
  }
  static async changePassword(req, res) {
    const id = req.params.userId;
    const { newPassword } = req.body;
    try {
      await db.User.update({ password: newPassword }, { where: { id: id } });
      res.json({ status: "success", message: "password changed!" });
    } catch (err) {
      res.json({ status: "error", message: err.message });
    }
  }
  static async deleteUser(req, res) {
    const userId = req.params.userId;
    try {
      const featurePerms = await db.FeaturePerms.findOne({
        where: { entityId: userId, entityName: "Users" },
      });
      if (featurePerms) {
        await db.FeaturePerms.destroy({
          where: {
            entityId: userId,
            entityName: "Users",
          },
        });
      }
      const userRole = await db.UserRole.findOne({ where: { userId } });
      if (userRole) {
        await db.UserRole.destroy({ where: { userId } });
      }
      const userGroup = await db.UserGroup.findOne({ where: { userId } });
      if (userGroup) {
        await db.UserGroup.destroy({ where: { userId } });
      }
      await db.User.destroy({ where: { id: userId } });

      res.json({
        status: "success",
        message: "User destroyed",
      });
    } catch (err) {
      res.json({
        status: "error",
        message: err.message,
      });
    }
  }
}

module.exports = UserController;

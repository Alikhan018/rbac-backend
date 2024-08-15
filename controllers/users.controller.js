const db = require("../models");
const bcrypt = require("bcrypt");

class UserController {
  constructor() {}

  static async getAll(req, res) {
    try {
      const users = await db.User.findAll({ order: [["email", "ASC"]] });
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
        where: { id: parseInt(userId) },
        include: [
          {
            model: db.Role,
            as: "roles",
            include: [
              {
                model: db.Feature,
                as: "features",
              },
            ],
          },
          {
            model: db.Group,
            as: "groups",
            include: [
              {
                model: db.Feature,
                as: "features",
              },
            ],
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
      res.json({
        status: "error",
        message: err,
      });
    }
  }
  static async createUser(req, res) {
    const { email, password, roles, groups } = req.body;
    try {
      const hash = bcrypt.hashSync(password, 10);
      const user = await db.User.create({
        email,
        password: hash,
      });
      if (roles)
        if (roles.length > 0) {
          roles.map(
            async (role) =>
              await db.UserRole.create({
                userId: parseInt(user.dataValues.id),
                roleId: parseInt(role.id),
              })
          );
        }
      if (groups)
        if (groups.length > 0) {
          groups.map(
            async (group) =>
              await db.UserGroup.create({
                userId: parseInt(user.dataValues.id),
                groupId: parseInt(group.id),
              })
          );
        }
      res.json({
        status: "success",
        message: "user created!",
      });
    } catch (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
  }
  static async updateUser(req, res) {
    const userId = parseInt(req.params.userId);
    const { email, roles, groups } = req.body;
    try {
      await db.User.update(
        { email },
        {
          where: { id: userId },
        }
      );
      if (roles) {
        await db.UserRole.destroy({ where: { userId: userId } });
        roles.map(
          async (role) =>
            await db.UserRole.create({
              userId,
              roleId: role.id,
            })
        );
      } else {
      }
      if (groups) {
        await db.UserGroup.destroy({ where: { userId: userId } });
        groups.map(
          async (group) =>
            await db.UserGroup.create({
              userId,
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
      const hash = bcrypt.hashSync(password, 10);
      await db.User.update({ password: hash }, { where: { id: id } });
      res.json({ status: "success", message: "password changed!" });
    } catch (err) {
      res.json({ status: "error", message: err.message });
    }
  }
  static async deleteUser(req, res) {
    const userId = parseInt(req.params.userId);
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

  static async countUser(req, res) {
    const count = await db.sequelize.query(
      'SELECT CAST(COUNT(*) AS INTEGER) FROM "Users"',
      { type: db.sequelize.QueryTypes.SELECT }
    );
    res.json({ count });
  }
}

module.exports = UserController;

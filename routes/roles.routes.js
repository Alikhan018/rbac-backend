const express = require("express");
const Controller = require("../controllers/roles.controller");

class RolesRouter {
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
    this.router.get(`/`, Controller.getAll);
    this.router.get(`/:roleId`, Controller.getRole);
    this.router.post(`/create`, Controller.createRole);
    this.router.put(`/:roleId/update`, Controller.updateRole);
    this.router.delete(`/:roleId/delete`, Controller.deleteRole);
  }
}

module.exports = new RolesRouter().router;

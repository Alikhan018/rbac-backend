const express = require("express");
const Controller = require("../controllers/groups.controller");

class GroupRoutes {
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
    this.router.get(`/`, Controller.getAll);
    this.router.get(`/count`, Controller.countGroups);
    this.router.get(`/:groupId`, Controller.getGroup);
    this.router.post(`/create`, Controller.createGroup);
    this.router.put(`/:groupId/update`, Controller.updateGroup);
    this.router.delete(`/:groupId/delete`, Controller.deleteGroup);
  }
}

module.exports = new GroupRoutes().router;

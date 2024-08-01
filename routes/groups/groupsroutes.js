const express = require("express");
const Controller = require("../../controllers/groupsController/groupscontroller");

class GroupRoutes {
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
    this.router.get(`/`, Controller.getAll);
    this.router.get(`/:groupId`, Controller.getGroup);
    this.router.post(`/create`, Controller.createGroup);
    this.router.put(`/:groupsId/update`, Controller.updateGroup);
    this.router.delete(`/:groupsId/delete`, Controller.deleteGroup);
  }
}

module.exports = new GroupRoutes().router;

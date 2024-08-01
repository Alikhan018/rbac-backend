const express = require("express");
const Controller = require("../../controllers/usersController/userscontroller");

class UsersRouter {
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
    this.router.get(`/`, Controller.getAll);
    this.router.get(`/:userId`, Controller.getUser);
    this.router.post(`/create`, Controller.createUser);
    this.router.put(`/:userId/update`, Controller.updateUser);
    this.router.put(`/:userId/changepassword`, Controller.changePassword);
    this.router.delete(`/:userId/delete`, Controller.deleteUser);
  }
}

module.exports = new UsersRouter().router;

const express = require("express");
const Controller = require("../controllers/home.controller");

class HomeRouter {
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
    this.router.post(`/login/auth`, Controller.loginAuth);
    // this.router.post(`/changepassword/match`, Controller.matchPassword);
  }
}

module.exports = new HomeRouter().router;

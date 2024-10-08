const express = require("express");
const cors = require("cors");
const Home = require("./routes/home.routes");
const Users = require("./routes/users.routes");
const Roles = require("./routes/roles.routes");
const Groups = require("./routes/groups.routes");

class Server {
  constructor() {
    this.app = express();
    this.port = 3000;
    this.host = "localhost";
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors());
    this.start();
    this.routes();
  }
  routes() {
    this.app.use(`/`, Home);
    this.app.use(`/users`, Users);
    this.app.use(`/roles`, Roles);
    this.app.use(`/groups`, Groups);
  }
  start() {
    this.app.listen(this.port, this.host, () => {
      console.log(`Server started at http://${this.host}:${this.port}`);
    });
  }
}

module.exports = Server;

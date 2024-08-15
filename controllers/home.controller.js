const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "key4login";

class Home {
  constructor() {}
  static async loginAuth(req, res) {
    const { email, password } = req.body;
    try {
      const user = await db.User.findOne({ where: { email: email } });
      if (user) {
        if (await bcrypt.compare(password, user.password)) {
          const refinedFromUser = {
            id: user.dataValues.id,
            email: user.dataValues.email,
          };
          const token = jwt.sign({ refinedFromUser }, secretKey);
          res.json({
            message: "logged in",
            token,
          });
        } else {
          res.json({ message: "password is wrong" });
        }
      } else {
        res.json({ message: "user not found!" });
      }
    } catch (err) {
      console.log(err);
      res.json({ message: err.message });
    }
  }
  // static async matchPassword(req, res) {
  //   const { password } = req.body;
  //   try {
  //     const user = await User.findOne({ where: { email: req.user.id } });
  //     if (user) {
  //       if (user.password === password) {
  //         res.json({ message: "password matched" });
  //       }
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     res.json({ message: err.message });
  //   }
  // }
}

module.exports = Home;

var express = require('express');
const UserModel = require("../models/user");
var router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
 
  res.render("login");

});
router.post("/", async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const checkIfUserExists = await UserModel.findOne({
      username: username,
      password: password,
    });
    if (!checkIfUserExists) {
      throw new Error("User not found");
    }
    res.redirect("/");
  } catch (err) {
    res.redirect("/login");
  }
});
router.post("/addUser", async function (req, res, next) {
  try {
    const { username, email } = req.body;
    const checkIfUserExists = await UserModel.findOne({
      username: username,
    });
    if (checkIfUserExists) {
      res.send("User already exists");
    } else {
      const newUser = new UserModel({
        username: username,
        email: email,
      });
      await newUser.save();
      res.redirect("http://localhost:3000/users/dashboard");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});







module.exports = router;

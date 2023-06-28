const express = require("express");
const router = express.Router();
const userController = require("../Controller/User/index");

router.post("/register", [], userController.createUser);
router.post("/login", [], userController.loginUser);
router.get("/auto", [], userController.autoLogin);
router.get("/logout", userController.logout);

module.exports = router;

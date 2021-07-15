const express = require("express");
const router = express.Router();

const authController = require("../controller/authController");
// const procedureController = require("../controller/procedureController");

// router.route("/user").get(authController.user);
router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
// router.route("/user/login").post(authController.login);
// router.route("/procedure/:title").get(procedureController.procedureUpdate);

module.exports = router;

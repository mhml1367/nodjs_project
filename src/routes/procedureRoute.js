const express = require("express");
const router = express.Router();

const procedureController = require("../controller/procedureController");
const authController = require("../controller/authController");

router.route("/").post(authController.checkToken,procedureController.procedureInsert);
router.route("/:id").get(authController.checkToken,procedureController.procedure);
router.route("/:id").patch(authController.checkToken,procedureController.procedureUpdate);
router.route("/:id").delete(authController.checkToken,procedureController.procedureRemove);

module.exports = router;

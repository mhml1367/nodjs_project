const express = require("express");
const router = express.Router();

const procedureController = require("../controller/procedureReportController");
const authController = require("../controller/authController");

router.route("/").post(authController.checkToken,procedureController.procedureInsert);
router.route("/:id").get(authController.checkToken,procedureController.procedure);

module.exports = router;

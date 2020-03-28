const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile_controller");

router.get("/", profileController.getProfile);
router.post("/", profileController.signup);

module.exports = router;

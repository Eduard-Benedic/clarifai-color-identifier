const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");

router.get("/profile", userController.getProfile);
router.post("/", userController.signup);
router.post("/login", userController.login);
router.post("/color", userController.saveColor);

module.exports = router;

const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");

router.get("/profile", userController.populateProfile);
router.post("/", userController.signup);
router.post("/login", userController.login);
router.put("/color", userController.saveColor);
router.delete("/color", userController.deleteColor);

module.exports = router;

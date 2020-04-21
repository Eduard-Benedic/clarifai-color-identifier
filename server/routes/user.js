const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");

const { check, validationResult } = require("express-validator");

router.get("/profile", userController.populateProfile);
router.post(
  "/",
  [check("username").isEmail(), check("password").isLength({ min: 5 })],
  userController.signup
);

router.post("/login", userController.login);
router.put("/color", userController.saveColor);
router.delete("/color", userController.deleteColor);

module.exports = router;

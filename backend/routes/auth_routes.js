const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth_controller");

router.post("/login", authController.login);
router.get("/profile", authController.profile);
router.get("/logout", authController.logout);

module.exports = router;
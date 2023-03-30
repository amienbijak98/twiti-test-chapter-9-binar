const express = require("express");
const router = express.Router();
const {
  Register,
  Login,
  LoginPage,
  whoami,
} = require("../controllers/user.controller");

router.post("/login", Login);
router.get("/login", LoginPage);
router.post("/register", Register);
router.get("/whoami", whoami);
module.exports = router;

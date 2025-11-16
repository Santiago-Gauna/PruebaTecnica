const express = require("express");
const {
  loginUserController,
  newUserController,
} = require("../controllers/loginController");

const router = express.Router();

router.post("/", loginUserController);
router.post("/register", newUserController);

module.exports = router;

const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUser } = require("../controller/user.controller");   
const { verifyToken } = require("../middleware/verifyToken");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/get-current-user", verifyToken, getUser);

module.exports = router;
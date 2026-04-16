
const express = require("express");
const router = express.Router();

const { Manageusers, Managevendors, Manageproducts } = require("../controller/admin.controller")
const { verifyToken, verifyIsAdmin } = require("../middleware/verifyToken")

router.get("/users", verifyToken, verifyIsAdmin, Manageusers);
router.get("/vendors", verifyToken, verifyIsAdmin, Managevendors);
router.get("/products", verifyToken, verifyIsAdmin, Manageproducts);

module.exports = router
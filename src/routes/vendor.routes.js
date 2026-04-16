const express = require("express");
const { ApplyAsVendor, getVendorProducts, getVendorDetails, getAllVendors } = require("../controller/vendor.controller");
const router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");

router.post("/apply",verifyToken, ApplyAsVendor);
router.get('/products', verifyToken, getVendorProducts)
router.get('/:id', verifyToken, getVendorDetails)
router.get('/', verifyToken, getAllVendors)

module.exports = router;
const express = require('express');
const { getAllProducts,getSingleProduct, createProduct, Updateproducts } = require('../controller/product.controller');
const { verifyIsAdmin, verifyIsVendor, verifyToken } = require('../middleware/verifyToken');
const router = express.Router();

router.get('/', getAllProducts)
router.get('/:id', getSingleProduct)
router.post('/create', verifyToken, verifyIsVendor, createProduct )
router.patch('/:id', verifyToken, verifyIsVendor, Updateproducts )

module.exports = router;
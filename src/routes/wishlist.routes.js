const express = require('express')
const router = express.Router()
const { getWishlist, toggleWishlist, clearWishlist } = require('../controller/wishlist.controller')
const { verifyToken } = require('../middleware/verifyToken')

router.get('/',  verifyToken, getWishlist)
router.post('/:id', verifyToken, toggleWishlist)
router.delete('/', verifyToken, clearWishlist)

module.exports = router
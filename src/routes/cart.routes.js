const express = require('express')
const router = express.Router()
const { getCart, addToCart, updateQuantity, removeFromCart, clearCart } = require('../controller/cart.controller')
const { verifyToken } = require('../middleware/verifyToken')

router.get('/', verifyToken, getCart)
router.post('/:id', verifyToken, addToCart)
router.patch('/:id', verifyToken, updateQuantity)
router.delete('/:id', verifyToken, removeFromCart)
router.delete('/', verifyToken, clearCart)

module.exports = router
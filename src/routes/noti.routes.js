const express = require('express');
const router = express.Router();
const { getNotifications, markAsRead, markAllAsRead } = require('../controller/noti.controller')
const { verifyToken } = require('../middleware/verifyToken')

router.get('/', verifyToken, getNotifications)
router.patch('/:id', verifyToken, markAsRead)
router.patch('/read-all', verifyToken, markAllAsRead)

module.exports = router
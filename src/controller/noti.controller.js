const Notification = require("../model/notification")

async function getNotifications(req, res) {
  const notifications = await Notification.find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .limit(20)
  res.status(200).json({ notifications })
}

async function markAsRead(req, res) {
  await Notification.findByIdAndUpdate(req.params.id, { read: true })
  res.status(200).json({ message: 'Marked as read' })
}

async function markAllAsRead(req, res) {
  await Notification.updateMany({ user: req.user.id, read: false }, { read: true })
  res.status(200).json({ message: 'All marked as read' })
}
module.exports = {
  getNotifications,
  markAsRead,
  markAllAsRead
}
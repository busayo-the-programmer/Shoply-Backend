const mongoose = require('mongoose')
const { Schema, model } = mongoose

const wishlistSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true, // one wishlist per user
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      }
    ],
  },
  { timestamps: true }
)

module.exports = model('Wishlist', wishlistSchema)
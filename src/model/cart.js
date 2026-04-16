const mongoose = require('mongoose')
const { Schema, model } = mongoose

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true, // one cart per user
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: [1, 'Quantity cannot be less than 1'],
        },
      }
    ],
  },
  { timestamps: true }
)

module.exports = model('Cart', cartSchema)
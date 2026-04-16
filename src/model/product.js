const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    image: {
      type: String
    },

    stock: {
      type: Number,
      default: 0
    },
    
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: [true, "Vendor reference is required"]
      }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", productSchema);
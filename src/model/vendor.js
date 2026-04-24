const mongoose = require('mongoose')
const { Schema, model } = mongoose

const vendorSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Full name must be at least 2 characters'],
      maxlength: [50, 'Full name is too long'],
    },

    businessName: {
      type: String,
      required: [true, 'Business name is required'],
      trim: true,
      minlength: [2, 'Business name must be at least 2 characters'],
      maxlength: [100, 'Business name is too long'],
    },

    businessType: {
      type: String,
      required: [true, 'Business type is required'],
      enum: {
        values: ['sole_proprietor', 'partnership', 'llc', 'corporation', 'other'],
        message: '{VALUE} is not a valid business type',
      },
    },

    businessEmail: {
      type: String,
      required: [true, 'Business email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid business email'],
    },

    storeName: {
      type: String,
      required: [true, 'Store name is required'],
      unique: true,
      trim: true,
      minlength: [2, 'Store name must be at least 2 characters'],
      maxlength: [60, 'Store name must be under 60 characters'],
    },

    productCategory: {
      type: String,
      required: [true, 'Product category is required'],
      enum: {
        values: [
          'electronics',
          'fashion',
          'beauty',
          'home_garden',
          'sports',
          'food_beverage',
          'books',
          'toys',
          'health',
          'other',
        ],
        message: '{VALUE} is not a valid product category',
      },
    },

    expectedMonthlyRevenue: {
      type: String,
      required: [true, 'Expected monthly revenue is required'],
      enum: {
        values: ['under_1k', '1k_5k', '5k_20k', '20k_50k', 'above_50k'],
        message: '{VALUE} is not a valid revenue range',
      },
    },

    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true,
    },

    state: {
      type: String,
      required: [true, 'State / province is required'],
      trim: true,
    },

    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
      minlength: [5, 'Please enter a valid address'],
      maxlength: [200, 'Address is too long'],
    },

    agreeToTerms: {
      type: Boolean,
      required: [true, 'You must accept the terms and conditions'],
      validate: {
        validator: (v) => v === true,
        message: 'You must accept the terms and conditions',
      },
    },

    agreeToVendorPolicy: {
      type: Boolean,
      required: [true, 'You must accept the vendor policy'],
      validate: {
        validator: (v) => v === true,
        message: 'You must accept the vendor policy',
      },
    },

    // ── Application status ──────────────────────────
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'suspended'],
      default: 'pending',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      // required: [true, 'User account is required'],
    },
  },
  {
    timestamps: true, // adds createdAt + updatedAt
  }
)

// Index for fast lookup by email and status
vendorSchema.index({ status: 1 })
vendorSchema.index({ productCategory: 1 })

module.exports = mongoose.model('Vendor', vendorSchema)
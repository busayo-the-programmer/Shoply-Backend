const Wishlist = require('../model/wishlist');
    
// GET /api/wishlist
async function getWishlist(req, res) {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id })
      .populate('products', 'name price image category')

    if (!wishlist) {
      return res.status(200).json({ products: [] })
    }

    // filter out nulls
    const validProducts = wishlist.products.filter(p => p !== null)

    res.status(200).json({ ...wishlist.toObject(), products: validProducts })
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch wishlist', error: error.message })
  }
}

// POST /api/wishlist/:productId
async function toggleWishlist(req, res) {
  try {
    const { id: productId } = req.params

    let wishlist = await Wishlist.findOne({ user: req.user.id })
  .populate("products")

    // create wishlist if it doesn't exist
    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user.id,
        products: [productId],
      })

      return res.status(201).json({
        message: "Added to wishlist",
        wishlist,
      })
    }

    const exists = wishlist.products.some(
      id => id.toString() === productId
    )

    if (exists) {
      wishlist.products = wishlist.products.filter(
        id => id.toString() !== productId
      )

      await wishlist.save()

      return res.status(200).json({
        message: "Removed from wishlist",
        wishlist,
      })
    }

    wishlist.products.push(productId)

    await wishlist.save()

    res.status(200).json({
      message: "Added to wishlist",
      wishlist,
    })

  } catch (error) {
    res.status(500).json({
      message: "Failed to update wishlist",
      error: error.message,
    })
  }
}

// DELETE /api/wishlist
async function clearWishlist(req, res) {
  try {
    await Wishlist.findOneAndUpdate(
      { user: req.user.id },
      { products: [] }
    )
    res.status(200).json({ message: 'Wishlist cleared' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to clear wishlist', error: error.message })
  }
}

module.exports = { getWishlist, toggleWishlist, clearWishlist }

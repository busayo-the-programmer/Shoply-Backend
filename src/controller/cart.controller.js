const Cart = require("../model/cart");
const Notification = require("../model/notification");


// GET /api/cart
async function getCart(req, res) {

  try {
    const cart = await Cart.findOne({ user: req.user.id })
      .populate('items.product', 'name price image category stock')

    if (!cart) {
      return res.status(200).json({ items: [] })
    }

    res.status(200).json(cart)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cart', error: error.message })
  }
}

// POST /api/cart/:productId
async function addToCart(req, res) {
  
  try {
    const id  = req.params.id
    const { quantity = 1 } = req.body
    const user = req.user
    console.log(user.firstname);
    
    let cart = await Cart.findOne({ user: req.user.id })

    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: [{ product: id, quantity }],
      })
      console.log(cart)
      
        await Notification.create({
          user: req.user.id,
          text: `Added ${quantity} of product ${id} to cart`,
          type: 'cart'
        })
      return res.status(201).json({ message: 'Added to cart', cart })
      
    }

    const existingItem = cart.items
      .find(i => i.product.toString() === id)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.items.push({ product: id, quantity })
    }

    await cart.save()
        await Notification.create({
          user: req.user.id,
          text: `Updated ${quantity} of product ${id} to cart`,
          type: 'cart'
        })
    res.status(200).json({ message: 'Cart updated', cart })

  } catch (error) {
    res.status(500).json({ message: 'Failed to add to cart', error: error.message })
  }
}

  // PATCH /api/cart/:productId
  async function updateQuantity(req, res) {
    try {
      const { id } = req.params
      const { quantity } = req.body

    if (typeof quantity !== "number" || quantity < 1){
        return res.status(400).json({ message: 'Quantity must be at least 1' })
      }

      const cart = await Cart.findOne({ user: req.user.id })
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' })
      }

      const item = cart.items.find(i => i.product.toString() === id)
      if (!item) {
        return res.status(404).json({ message: 'Item not found in cart' })
      }

      item.quantity = quantity
    await cart.save()
      res.status(200).json({ message: 'Quantity updated', cart })

          await Notification.create({
            user: req.user.id,
            text: `Updated ${quantity} of product ${id} to cart`,
            type: 'cart'
          })

    } catch (error) {
      res.status(500).json({ message: 'Failed to update quantity', error: error.message })
    }
  }

  // DELETE /api/cart/:productId
  async function removeFromCart(req, res) {
    try {
      const { id } = req.params

      const cart = await Cart.findOne({ user: req.user.id })
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' })
      }

      cart.items = cart.items.filter(i => i.product.toString() !== id)
      await cart.save()
       await Notification.create({
            user: req.user.id,
            text: `Product ${id} removed from cart`,
            type: 'cart'
          })
      res.status(200).json({ message: 'Item removed from cart', cart })
     
    } catch (error) {
      res.status(500).json({ message: 'Failed to remove item', error: error.message })
    }
  }

// DELETE /api/cart
async function clearCart(req, res) {
  try {
    await Cart.findOneAndUpdate(
      { user: req.user.id },
      { items: [] }
    )
    res.status(200).json({ message: 'Cart cleared' })
        await Notification.create({
          user: req.user.id,
          text: `Cart cleared`,
          type: 'cart'
        })
  } catch (error) {
    res.status(500).json({ message: 'Failed to clear cart', error: error.message })
  }
}

module.exports = { getCart, addToCart, updateQuantity, removeFromCart, clearCart }
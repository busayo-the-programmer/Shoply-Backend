const Vendors = require("../model/vendor");
const Users = require("../model/register");
const Products = require("../model/product");

async function Manageusers(req, res) {
  try {
    const restrictedTo = req.user.role === "admin";
    if (!restrictedTo) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    const users = await Users.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error occurred while fetching users" });
  }
}
async function Managevendors(req, res) {
  const restrictedTo = req.user.role === "admin";
  if (!restrictedTo) {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  try {
    const vendors = await Vendors.find().select("-password");
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ message: "Error occurred while fetching vendors" });
  }
}

async function Manageproducts(req, res) {
  const restrictedTo = req.user.role === "admin";
  if (!restrictedTo) {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  try {
    const products = await Products.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error occurred while fetching products" });
  }
}
module.exports = { Manageusers, Managevendors, Manageproducts };

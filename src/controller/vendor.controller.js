const Vendor = require('../model/vendor');
const Product = require('../model/product')
const sendEmail = require('../utils/sendEmails');

async function ApplyAsVendor(req, res) {
    try {
      const userId = req.user.id // ← from your auth middleware, not the request body
    // prevent a user from applying twice
    const existingApplication = await Vendor.findOne({ user: userId })
    if (existingApplication) {
      return res.status(400).json({
        message: `You already have a ${existingApplication.status} vendor application`,
      })
    }

        const {fullName, businessName, businessType, agreeToTerms, businessEmail, storeName, productCategory, expectedMonthlyRevenue, country, state, address, agreeToVendorPolicy} = req.body;
        const newVendor = await Vendor.create({
            fullName,
            businessName,
            businessEmail,
            businessType,
            storeName,
            productCategory,
            expectedMonthlyRevenue,
            country, 
            state,
            address,
            agreeToVendorPolicy,
            agreeToTerms
        });
         await sendEmail(
        businessEmail,
        "Vendor Application Received",
        `
            <h2>Application Successful 🎉</h2>
            <p>Hello ${fullName},</p>
            <p>Your vendor application has been successfully submitted.</p>
            <p>Our team will review it shortly.</p>
            <br/>
            <p>Regards,<br/>Vendora Team</p>
        `
        );
         res.status(201).json({
        message: "Vendor registered successfully",
        user: newVendor,    
         });
    } catch (error) {
    res.status(500).json({ message: "Application failed", error: error.message });
    }
}

async function getAllVendors(req, res) {
  try {
    const vendors = await Vendor.find()
    res.status(200).json({ vendors })
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch vendors", error: error.message })
  }
}

async function getVendorDetails(req, res) {
  try {
        const { id } = req.params;
    const vendor = await Vendor.findById(id)
    if (!vendor) {
      return res.status(404).json({ message: "Vendor application not found" })
    }
    res.status(200).json({ vendor })
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch vendor details", error: error.message })
  }
}

async function getVendorProducts(req, res){
   const vendorId = req.user.id;
  try {
   const products = await Product.find({ vendor: vendorId })
    res
      .status(200)
      .json({ message: "Vendors's products retrieved successfully", products });

  } catch (error) {
    console.log(error);
    
    res.status(500).json({message: "error fetching vendor's product", error: error.message})
  }
}


module.exports = {ApplyAsVendor, getVendorProducts, getVendorDetails, getAllVendors}
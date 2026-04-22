const Products = require('../model/product');

async function createProduct(req, res) {
    try {
        const { name, description, price, category, image, stock } = req.body;
       console.log(req.body)  // you already have this
console.log(req.user)  // add this — if it logs undefined, that's your bug
        const vendor = req.user.id
        const newProduct = await Products.create({
            name,
            description,
            price,
            category,
            image,
            stock,
            vendor: vendor
        });
        res.status(201).json({ message: "Product created successfully", product: newProduct });

    } catch (error) {
        res.status(500).json({ message: "Failed to create product", error: error.message });
    }
}
async function getAllProducts(req, res) {
    try {
        const products = await Products.find(); 
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve products", error: error.message });
    }
}

async function getSingleProduct(req, res) {
    try {
        const id = req.params.id
         const product = await Products.findById(id); 
         res.status(200).json(product)
    } catch (error) {
       res.status(500).json({ message: "Failed to retrieve products", error: error.message });

    }
}
async function Updateproducts(req, res){
    try {
        const vendor = req.user.id
        const productId = req.params.id
        const findProduct = await Products.findById(productId)
        if (!findProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (findProduct.vendor.toString() !== vendor) {
            return res.status(403).json({ message: "Unauthorized to update this product" });
        }
        const { name, description, price, category, image, stock } = req.body;
        const updatedProduct = await Products.findByIdAndUpdate(
            productId,
            { name, description, price, category, image, stock },
            { new: true }
        );
        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
         res.status(500).json({ message: "Failed to update product", error: error.message });

    }

}


module.exports = { createProduct, getAllProducts, getSingleProduct , Updateproducts}
require("dotenv").config();

const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();
const userRoutes = require("./src/routes/user.routes");
const vendorRoutes = require("./src/routes/vendor.routes")
const productRoutes = require("./src/routes/product.routes");
const wishlistRoutes = require("./src/routes/wishlist.routes");
const cartRoutes = require("./src/routes/cart.routes");
const adminRoutes = require("./src/routes/admin.routes")
const notificationRoutes = require("./src/routes/noti.routes")  

//middleware
app.use(cors());
app.use(express.json());


//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/vendor", vendorRoutes);
app.use("/api/v1/products", productRoutes);
app.use('/api/v1/wishlist', wishlistRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/notifications", notificationRoutes);

app.use((req, res) => { 
  res.status(404).send("Page Not Found");
})


//commit



const start = async() => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  };

};

start();


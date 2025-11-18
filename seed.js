const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB connected"))
    .catch(err => console.log(err));

async function seedProducts() {
    await Product.deleteMany({});

    await Product.insertMany([
        {
            name: "Running Shoes",
            description: "High-quality running shoes.",
            price: 79.99,
            image: "/images/products/shoes1.jpg"
        },
        {
            name: "Training Shirt",
            description: "Breathable sports shirt.",
            price: 25.99,
            image: "/images/products/shirt1.jpg"
        },
        {
            name: "Yoga Pants",
            description: "Comfort stretch yoga pants.",
            price: 39.99,
            image: "/images/products/yoga1.jpg"
        },
        {
            name: "Sport Shorts",
            description: "Lightweight running shorts.",
            price: 22.99,
            image: "/images/products/shorts1.jpg"
        },
        {
            name: "Hoodie",
            description: "Comfort sports hoodie.",
            price: 49.99,
            image: "/images/products/hoodie1.jpg"
        },
        {
            name: "Sports Bra",
            description: "Flexible support bra.",
            price: 29.99,
            image: "/images/products/bra1.jpg"
        },
        {
            name: "Gym Gloves",
            description: "Grip-enhancing gloves.",
            price: 14.99,
            image: "/images/products/gloves1.jpg"
        },
        {
            name: "Water Bottle",
            description: "Insulated sports bottle.",
            price: 12.99,
            image: "/images/products/bottle1.jpg"
        },
        {
            name: "Running Cap",
            description: "Lightweight running cap.",
            price: 9.99,
            image: "/images/products/cap1.jpg"
        },
        {
            name: "Kettlebell 10kg",
            description: "Training kettlebell.",
            price: 59.99,
            image: "/images/products/kettlebell1.jpg"
        }
    ]);

    console.log("✅ Products inserted!");
    process.exit();
}

seedProducts();


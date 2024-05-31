import { connectDB } from "@/database/connection";
import { Product } from "@/models/ProductModel";
import { Category } from "@/models/CategoryModel";
import mongoose from "mongoose";

// Sample data for the Category model
const categories = [
  { name: 'Electronics' },
  { name: 'Clothing' },
  { name: 'Books' },
  // Add more sample categories as needed
];

// Sample data for the Product model with associated category ObjectId
const products = [
  { name: 'Laptop', category: null, price: 999, stock: 10 },
  { name: 'T-shirt', category: null, price: 20, stock: 50 },
  { name: 'Java Programming Book', category: null, price: 30, stock: 20 },
  { name: 'Eloquent JavaScript Book', category: null, price: 30, stock: 20 },
  // Add more sample products as needed
];

async function seedCategories(): Promise<void> {
  try {
    // Delete existing categories (optional)
    await Category.deleteMany();
    // Insert sample categories
    const insertedCategories = await Category.insertMany(categories);
    
    // Assign category ObjectId to products
    products.forEach(product => {
      // Assign a random category ObjectId from the inserted categories
      product.category = insertedCategories[Math.floor(Math.random() * insertedCategories.length)]._id;
    });
  } catch (err) {
    console.error('Error seeding categories:', err);
  }
}

async function seedProducts(): Promise<void> {
  try {
    // Delete existing products (optional)
    await Product.deleteMany();
    // Insert sample products
    await Product.insertMany(products);
  } catch (err) {
    console.error('Error seeding products:', err);
  }
}

// export { seedCategories, seedProducts };

connectDB();

// Run all seeders
async function seed(): Promise<void> {
  await seedCategories();
  await seedProducts();
  // Call other seeder functions here
  mongoose.connection.close(); // Close the connection after seeding
}
seed();
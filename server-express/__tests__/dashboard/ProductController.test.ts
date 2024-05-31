// __tests__/productController.test.ts
import request from 'supertest';
import mongoose from 'mongoose';
// import { MongoMemoryServer } from 'mongodb-memory-server';
import server from '../../src/server';
import {Product} from '../../src/models/ProductModel'
import { Category } from '../../src/models/CategoryModel';
// let mongoServer: MongoMemoryServer;

// beforeAll(async () => {
//   mongoServer = await MongoMemoryServer.create();
//   const mongoUri = await mongoServer.getUri();
//   await mongoose.connect(mongoUri);
// });
// afterAll(async () => {
//   await mongoose.disconnect();
//   await mongoServer.stop();
// });

describe('Product Controller', () => {
  it('should create a new product', async () => {
    const category = new Category({ name: 'Test Category', description: 'A test category' });
    await category.save();
    const res = await request(server)
      .post('/dashboard/products')
      .send({
        name: 'Test Product',
        price: 100,
        quantity: 50,
        category: category._id,
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Test Product');
  });

  it('should fetch all products', async () => {
    await Product.create({ name: 'Product 1', price: 100, quantity: 10, category: new mongoose.Types.ObjectId() });
    await Product.create({ name: 'Product 2', price: 200, quantity: 20, category: new mongoose.Types.ObjectId() });

    const res = await request(server).get('/dashboard/products');
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(2);
  });

  it('should fetch a product by id', async () => {
    const product = await Product.create({ name: 'Product 1', price: 100, quantity: 10, category: new mongoose.Types.ObjectId() });
    const res = await request(server).get(`/dashboard/products/${product._id}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe(product.name);
  });

  it('should update a product by id', async () => {
    const product = await Product.create({ name: 'Product 1', price: 100, quantity: 10, category: new mongoose.Types.ObjectId() });
    const res = await request(server)
      .put(`/dashboard/products/${product._id}`)
      .send({ name: 'Updated Product', price: 150 });

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('Updated Product');
    expect(res.body.price).toBe(150);
  });

  it('should delete a product by id', async () => {
    const product = await Product.create({ name: 'Product 1', price: 100, quantity: 10, category: new mongoose.Types.ObjectId() });
    const res = await request(server).delete(`/dashboard/products/${product._id}`);
    
    expect(res.statusCode).toEqual(204);
  });
});

afterEach(async () => {
  await Product.deleteMany({});
});

// afterAll(() => {
//   server.close();
// });
// __tests__/categoryController.test.ts
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import server from '../../src/server';
import { Category } from '../../src/models/CategoryModel';

// let mongoServer: MongoMemoryServer;

// beforeAll(async () => {
//   mongoServer = await MongoMemoryServer.create();
//   const mongoUri = await mongoServer.getUri();
//   await mongoose.createConnection(mongoUri);
// });
afterEach(async () => {
  await Category.deleteMany({});
});

// afterAll(async () => {
//   await mongoose.disconnect();
//   await mongoServer.stop();
// });

describe('Category Controller', () => {
  it('should create a new category', async () => {
    const res = await request(server)
      .post('/dashboard/categories')
      .send({
        name: 'Test Category',
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Test Category');
  });

  it('should fetch all categories', async () => {
    await Category.create({ name: 'Category 1' });
    await Category.create({ name: 'Category 2' });

    const res = await request(server).get('/dashboard/categories');
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(2);
  });

  it('should fetch a category by id', async () => {
    const category = await Category.create({ name: 'Category 1' });
    const res = await request(server).get(`/dashboard/categories/${category._id}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe(category.name);
  });

  it('should update a category by id', async () => {
    const category = await Category.create({ name: 'Category 1' });
    const res = await request(server)
      .put(`/dashboard/categories/${category._id}`)
      .send({ name: 'Updated Category' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('Updated Category');
  });

  it('should delete a category by id', async () => {
    const category = await Category.create({ name: 'Category 1' });
    const res = await request(server).delete(`/dashboard/categories/${category._id}`);
    
    expect(res.statusCode).toEqual(204);
  });
});

afterEach(async () => {
  await Category.deleteMany({});
});

afterAll(() => {
  server.close();
});


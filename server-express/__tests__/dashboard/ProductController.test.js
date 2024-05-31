"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// __tests__/productController.test.ts
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
// import { MongoMemoryServer } from 'mongodb-memory-server';
const server_1 = __importDefault(require("../../src/server"));
const ProductModel_1 = require("../../src/models/ProductModel");
const CategoryModel_1 = require("../../src/models/CategoryModel");
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
    it('should create a new product', () => __awaiter(void 0, void 0, void 0, function* () {
        const category = new CategoryModel_1.Category({ name: 'Test Category', description: 'A test category' });
        yield category.save();
        const res = yield (0, supertest_1.default)(server_1.default)
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
    }));
    it('should fetch all products', () => __awaiter(void 0, void 0, void 0, function* () {
        yield ProductModel_1.Product.create({ name: 'Product 1', price: 100, quantity: 10, category: new mongoose_1.default.Types.ObjectId() });
        yield ProductModel_1.Product.create({ name: 'Product 2', price: 200, quantity: 20, category: new mongoose_1.default.Types.ObjectId() });
        const res = yield (0, supertest_1.default)(server_1.default).get('/dashboard/products');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBe(2);
    }));
    it('should fetch a product by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield ProductModel_1.Product.create({ name: 'Product 1', price: 100, quantity: 10, category: new mongoose_1.default.Types.ObjectId() });
        const res = yield (0, supertest_1.default)(server_1.default).get(`/dashboard/products/${product._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toBe(product.name);
    }));
    it('should update a product by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield ProductModel_1.Product.create({ name: 'Product 1', price: 100, quantity: 10, category: new mongoose_1.default.Types.ObjectId() });
        const res = yield (0, supertest_1.default)(server_1.default)
            .put(`/dashboard/products/${product._id}`)
            .send({ name: 'Updated Product', price: 150 });
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toBe('Updated Product');
        expect(res.body.price).toBe(150);
    }));
    it('should delete a product by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield ProductModel_1.Product.create({ name: 'Product 1', price: 100, quantity: 10, category: new mongoose_1.default.Types.ObjectId() });
        const res = yield (0, supertest_1.default)(server_1.default).delete(`/dashboard/products/${product._id}`);
        expect(res.statusCode).toEqual(204);
    }));
});
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield ProductModel_1.Product.deleteMany({});
}));
// afterAll(() => {
//   server.close();
// });

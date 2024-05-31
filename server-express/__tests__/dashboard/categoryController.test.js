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
// __tests__/categoryController.test.ts
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../src/server"));
const CategoryModel_1 = require("../../src/models/CategoryModel");
// let mongoServer: MongoMemoryServer;
// beforeAll(async () => {
//   mongoServer = await MongoMemoryServer.create();
//   const mongoUri = await mongoServer.getUri();
//   await mongoose.createConnection(mongoUri);
// });
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield CategoryModel_1.Category.deleteMany({});
}));
// afterAll(async () => {
//   await mongoose.disconnect();
//   await mongoServer.stop();
// });
describe('Category Controller', () => {
    it('should create a new category', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default)
            .post('/dashboard/categories')
            .send({
            name: 'Test Category',
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.name).toBe('Test Category');
    }));
    it('should fetch all categories', () => __awaiter(void 0, void 0, void 0, function* () {
        yield CategoryModel_1.Category.create({ name: 'Category 1' });
        yield CategoryModel_1.Category.create({ name: 'Category 2' });
        const res = yield (0, supertest_1.default)(server_1.default).get('/dashboard/categories');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBe(2);
    }));
    it('should fetch a category by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const category = yield CategoryModel_1.Category.create({ name: 'Category 1' });
        const res = yield (0, supertest_1.default)(server_1.default).get(`/dashboard/categories/${category._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toBe(category.name);
    }));
    it('should update a category by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const category = yield CategoryModel_1.Category.create({ name: 'Category 1' });
        const res = yield (0, supertest_1.default)(server_1.default)
            .put(`/dashboard/categories/${category._id}`)
            .send({ name: 'Updated Category' });
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toBe('Updated Category');
    }));
    it('should delete a category by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const category = yield CategoryModel_1.Category.create({ name: 'Category 1' });
        const res = yield (0, supertest_1.default)(server_1.default).delete(`/dashboard/categories/${category._id}`);
        expect(res.statusCode).toEqual(204);
    }));
});
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield CategoryModel_1.Category.deleteMany({});
}));
afterAll(() => {
    server_1.default.close();
});

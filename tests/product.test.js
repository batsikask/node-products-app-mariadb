const dataSource = require('../connect').dataSource
const request = require('supertest')

const app = require('../app')
const helper = require('../helpers/product.helper')

require('dotenv').config

beforeEach(async () => {
    await dataSource
    .initialize()
    .then(function() {
        console.log("Connected to database")
    })
    .catch(function(error) {
        console.log("Problem while connecting to database ", error)
    })
})

afterEach(async () => {
    await dataSource.close()
})

describe('Request POST /api/products', () => {
    it('Creates a product', async() => {
        const res = await request(app)
        .post('/api/products')
        .send({
            title: "testProduct1",
            cost: 10,
            description: "Product for test",
            quantity: 1
        })
        expect(res.statusCode).toBe(200)
        expect(res.body.data).toBeTruthy()
    }, 10000)

    it('Creates a product testing product field', async() => {
        const res = await request(app)
        .post('/api/products')
        .send({
            title: null,
            cost: 10,
            description: "Product for test",
            quantity: 1
        })
        expect(res.statusCode).toBe(400)
        expect(res.body.data).toBeTruthy()
    }, 10000)

    it('Creates a product testing cost field', async() => {
        const res = await request(app)
        .post('/api/products')
        .send({
            title: "testProduct1",
            cost: null,
            description: "Product for testing cost field null",
            quantity: 1
        })
        expect(res.statusCode).toBe(400)
        expect(res.body.data).toBeTruthy()
    }, 10000)

    it('Creates a product testing description field', async() => {
        const res = await request(app)
        .post('/api/products')
        .send({
            title: "testProduct3",
            cost: 10,
            description: null,
            quantity: 1
        })
        expect(res.statusCode).toBe(400)
        expect(res.body.data).toBeTruthy()
    }, 10000)

    it('Creates a product testing quantity field', async() => {
        const res = await request(app)
        .post('/api/products')
        .send({
            title: "testProduct4",
            cost: 10,
            description: "Product for testing quantity field null",
            quantity: null
        })
        expect(res.statusCode).toBe(400)
        expect(res.body.data).toBeTruthy()
    }, 10000)
})

describe("Request GET /api/products", () => {
    it("Returns all products", async() => {
        const res = await request(app).get('/api/products')
        expect(res.statusCode).toBe(200)
        expect(res.body.data.length).toBeGreaterThan(0)
    }, 10000)
})

describe('Request GET /api/products/:title', () => {
    it('Returns a product', async() => {
        const result = await helper.findLastInsertedProduct()
        const res = await request(app).get('/api/products/' + result.title)
        expect(res.statusCode).toBe(200)
        expect(res.body.data.title).toBe(result.title)
    }, 10000)
})

describe('Request DELETE /api/products/:title', () => {
    it('Deletes last inserted product', async () => {
        const result = await helper.findLastInsertedProduct()
        const res = await request(app).delete('/api/products/' + result.title)
        expect(res.statusCode).toBe(200)
    },10000)
})
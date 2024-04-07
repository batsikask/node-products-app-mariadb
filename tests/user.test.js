const dataSource = require('../connect').dataSource
const request = require('supertest')

const app = require('../app')
const helper = require('../helpers/user.helper')

require('dotenv').config()

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

describe('Request POST /api/users', () => {
  it('Creates a user', async () => {
    const res = await request(app)
    .post('/api/users')
    .send({
      username: "testUser1",
      password: "123456",
      name:"John",
      surname: "Doe",
      email: "testUser1@mail.com"
    })
    expect(res.statusCode).toBe(200)
    expect(res.body.data).toBeTruthy()
  }, 10000);

  it('Creates a user testing unique username', async () => {
    const res = await request(app)
    .post('/api/users')
    .send({
      username: "testUser1",
      password: "123456",
      name:"Sam",
      surname: "Green",
      email: "testUser1@mail.com"
    })
    expect(res.statusCode).toBe(400)
    expect(res.body.data).toBeTruthy()
  }, 10000)
})

describe('Request GET /api/users', () => {

    it('Returns all users', async() => {
        const res = await request(app).get('/api/users')
        expect(res.statusCode).toBe(200)
        expect(res.body.data.length).toBeGreaterThan(0)
    }, 10000)
})

describe('Request GET /api/users/:username', () =>{
    it('Returns a user', async () => {
      const result = await helper.findLastInsertedUser()
      const res = await request(app).get('/api/users/' + result.username)
      expect(res.statusCode).toBe(200)
      expect(res.body.data.username).toBe(result.username)
      expect(res.body.data.email).toBe(result.email)
    }, 10000)
  })
  
  describe("DELETE /api/users/:username", () => {
    it("Delete last inserted user", async () =>{
      const result = await helper.findLastInsertedUser()
      const res = await request(app)
        .delete('/api/users/' + result.username)
      
      expect(res.statusCode).toBe(200)
    },10000)
  })
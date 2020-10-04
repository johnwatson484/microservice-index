require('../app/data')
jest.mock('../app/data')

describe('Server test', () => {
  let createServer
  let server

  beforeAll(async () => {
    createServer = require('../app/server')
  })

  beforeEach(async () => {
    server = await createServer()
    await server.initialize()
  })

  test('GET / route returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
  })

  afterEach(async () => {
    await server.stop()
  })
})

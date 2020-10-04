const joi = require('joi')
const boom = require('@hapi/boom')
const { createOrUpdate, getAll } = require('../services')

module.exports = [{
  method: 'GET',
  path: '/',
  handler: async (request, h) => {
    const services = await getAll(request.query.search)
    return h.view('home', { services })
  }
}, {
  method: 'POST',
  path: '/',
  options: {
    validate: {
      payload: joi.object({
        name: joi.string(),
        repository: joi.string(),
        version: joi.string(),
        description: joi.string(),
        framework: joi.string(),
        owner: joi.string()
      }),
      failAction: async (request, h, error) => {
        return boom.badRequest(error)
      }
    },
    handler: async (request, h) => {
      console.log(`received service update: ${JSON.stringify(request.payload)}`)
      try {
        await createOrUpdate(request.payload)
        return h.response('Service index updated').code(201)
      } catch (error) {
        console.error(error)
        return boom.badImplementation(error)
      }
    }
  }
}]

const db = require('../data')
const joi = require('joi')
const boom = require('@hapi/boom')

module.exports = [{
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return h.view('home')
  }
}, {
  method: 'POST',
  path: '/',
  options: {
    validate: {
      payload: joi.object({
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
      const service = {
        ...request.payload,
        updated: new Date()
      }

      console.log(service)
      // return await db.service.upsert(request.payload)
      return h.response(service).code(201)
    }
  }
}]

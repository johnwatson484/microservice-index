const joi = require('joi')
const databaseConfig = require('./db')
const envs = ['development', 'test', 'production']

// Define config schema
const schema = joi.object().keys({
  port: joi.number().default(3000),
  env: joi.string().valid(...envs).default(envs[0]),
  appName: joi.string()
})

// Build config
const config = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  appName: 'Microservice Index'
}

// Validate config
const result = schema.validate(config, {
  abortEarly: false
})

if (result.error) {
  throw new Error(`The server config is invalid. ${result.error.message}`)
}

const value = {
  ...result.value,
  database: databaseConfig
}

module.exports = value

const db = require('../data')

async function createOrUpdate (service) {
  const transaction = await db.sequelize.transaction()
  try {
    const existingService = await db.service.findOne({ where: { repository: service.repository, version: service.version }, transaction })
    if (!existingService) {
      await db.service.create({
        ...service,
        updated: new Date()
      })
    } else {
      existingService.update(service)
      await existingService.save({ transaction })
    }
    await transaction.commit()
  } catch (error) {
    await transaction.rollback()
    throw (error)
  }
}

async function getAll () {
  return await db.service.findAll({ order: [['name'], ['updated']] })
}

module.exports = {
  createOrUpdate,
  getAll
}

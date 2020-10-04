const db = require('../data')
const { QueryTypes } = require('sequelize')

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

async function getAll (search) {
  let services = await db.sequelize.query(
    'SELECT s.* FROM services AS s INNER JOIN (SELECT name, max(updated) AS updated FROM services GROUP BY name) AS l ON l.name = s.name AND l.updated = s.updated ORDER BY s.name;',
    { raw: true, type: QueryTypes.SELECT })

  if (search) {
    search = `%${search}%`
    let matches = await db.service.findAll({
      where: {
        [db.Sequelize.Op.or]: [{
          name: { [db.Sequelize.Op.iLike]: search }
        }, {
          repository: { [db.Sequelize.Op.iLike]: search }
        }, {
          description: { [db.Sequelize.Op.iLike]: search }
        }, {
          owner: { [db.Sequelize.Op.iLike]: search }
        }, {
          framework: { [db.Sequelize.Op.iLike]: search }
        }]
      }
    })
    matches = matches.map(x => x.serviceId)
    services = services.filter(x => matches.includes(x.serviceId))
  }
  return services
}

module.exports = {
  createOrUpdate,
  getAll
}

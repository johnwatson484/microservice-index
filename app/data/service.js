module.exports = (sequelize, DataTypes) => {
  const service = sequelize.define('service', {
    serviceId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    repository: DataTypes.STRING,
    version: DataTypes.STRING,
    description: DataTypes.STRING,
    framework: DataTypes.STRING,
    owner: DataTypes.STRING,
    updated: DataTypes.DATE
  }, {
    tableName: 'services',
    freezeTableName: true,
    timestamps: false
  })

  return service
}

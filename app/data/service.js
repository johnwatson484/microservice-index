module.exports = (sequelize, DataTypes) => {
  const service = sequelize.define('service', {
    serviceId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    repository: DataTypes.STRING,
    version: DataTypes.STRING,
    description: DataTypes.STRING,
    framework: DataTypes.STRING,
    owner: DataTypes.STRING,
    updated: DataTypes.DATE,
    updatedShortDate: {
      type: DataTypes.VIRTUAL,
      get () {
        return `${this.updated.getFullYear()}-${this.updated.getMonth() + 1}-${this.updated.getDate()}`
      }
    }
  }, {
    tableName: 'services',
    freezeTableName: true,
    timestamps: false
  })

  return service
}

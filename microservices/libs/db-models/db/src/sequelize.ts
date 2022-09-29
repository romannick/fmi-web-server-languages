import { Sequelize } from 'sequelize'

import { logger } from '../../../shared/log/src'

const log = logger('sequelize')

const databaseName = process.env.DB_DATABASE
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const host = process.env.DB_HOST

const sequelize = new Sequelize(databaseName, username, password, {
  host,
  benchmark: true,
  dialect: 'mysql',
  pool: {
    max: 30,
    min: 0,
    idle: 10000,
    acquire: 120000
  },
  logging: (sql, time) => log.debug(`sql=${sql} took ${JSON.stringify(time)}ms`)
})

sequelize
  .authenticate()
  .then(() =>
    log.info(
      `DB connection to ${username}@${host}/${databaseName} has been established successfully.`
    )
  )
  .catch((err) => log.error(`Unable to connect to the database error= ${err}`))

export default sequelize

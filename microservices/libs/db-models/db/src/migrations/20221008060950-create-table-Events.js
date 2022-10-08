'use strict'

const { DataTypes } = require('sequelize')

module.exports = {
  up: (queryInterface) =>
    queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      carId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Cars',
          key: 'id'
        }
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      kilometers: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false
      },
      periodic: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      nextDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      nextChangeInKilometers: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE
      }
    }),
  down: (queryInterface) => queryInterface.dropTable('Events')
}

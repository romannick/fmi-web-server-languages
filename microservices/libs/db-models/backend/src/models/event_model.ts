import { Model, DataTypes } from 'sequelize'
import { sequelize } from '@microservices/db-models/db'
import { Car } from '@microservices/api/backend-sdk'

export class EventModel extends Model {
  public id: number
  public carId: number
  public date: Date
  public kilometers: number
  public text: string
  public periodic: boolean
  public nextDate: Date
  public nextChangeInKilometers: number

  public createdAt: Date
  public updatedAt: Date

  public car?: Car
}

EventModel.init(
  {
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
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE
    }
  },
  {
    tableName: 'Events',
    sequelize
  }
)

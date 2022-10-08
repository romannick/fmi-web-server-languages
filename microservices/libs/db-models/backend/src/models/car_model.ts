import { Model, DataTypes } from 'sequelize'
import { sequelize } from '@microservices/db-models/db'
import { EventModel } from "@microservices/db-models/backend";

export class CarModel extends Model {
  public id: number
  public name: string
  public brand: string
  public model: string
  public year: number
  public license: string

  public createdAt: Date
  public updatedAt: Date

  public events?: EventModel[]
}

CarModel.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    license: {
      type: DataTypes.STRING,
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
    tableName: 'Cars',
    sequelize
  }
)

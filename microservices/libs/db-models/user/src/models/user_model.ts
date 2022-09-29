import { Model, DataTypes } from 'sequelize'
import { sequelize } from '@microservices/db-models/db'

export class UserModel extends Model {
  public id: number
  public firstName: string
  public lastName: string

  public createdAt: Date
  public updatedAt: Date
  public deletedAt: Date
}

UserModel.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
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
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE
    }
  },
  {
    tableName: 'Users',
    sequelize,
    paranoid: true
  }
)

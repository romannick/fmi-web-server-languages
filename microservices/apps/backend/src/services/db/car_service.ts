import { Service } from 'typedi'
import { CarModel, EventModel } from '@microservices/db-models/backend'
import { CreateCarRequest } from '@microservices/api/backend-sdk'

@Service()
export class CarService {
  createCar(payload: CreateCarRequest): Promise<CarModel> {
    return CarModel.create(payload as any)
  }

  getAllCars(): Promise<CarModel[]> {
    return CarModel.findAll({
      include: {
        model: EventModel,
        as: 'events'
      }
    })
  }

  async editCar(id: number, payload: CreateCarRequest): Promise<void> {
    await CarModel.update(payload, { where: { id } })
  }

  async deleteCar(id: number): Promise<void> {
    await CarModel.destroy({ where: { id } })
  }
}

import { Service } from 'typedi'
import { CarModel, EventModel } from '@microservices/db-models/backend'
import { CreateEventRequest } from '@microservices/api/backend-sdk'

@Service()
export class EventService {
  createEvent(payload: CreateEventRequest): Promise<EventModel> {
    return EventModel.create(payload as any)
  }

  getAllEvents(): Promise<EventModel[]> {
    return EventModel.findAll({
      include: {
        model: CarModel,
        as: 'car'
      }
    })
  }

  async editEvent(id: number, payload: CreateEventRequest): Promise<void> {
    await EventModel.update(payload, { where: { id } })
  }

  async deleteEvent(id: number): Promise<void> {
    await EventModel.destroy({ where: { id } })
  }
}
